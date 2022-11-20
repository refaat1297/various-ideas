import {ref} from "vue";
import {collection, getDocs, addDoc, deleteDoc, doc} from "firebase/firestore";
import {db, storage} from "@/services/firebase.js";

import {ref as storageRef, uploadBytesResumable, getDownloadURL, deleteObject} from 'firebase/storage'

export function useAdvancedImageUploader () {

  let filesData = ref([])
  const isLoading = ref(false)
  let uploads = ref([
    // {
    //   id: Math.random().toString(36).substring(2, 9),
    //   currentProgress: 100.00,
    //   name:"invention-icon.svg",
    //   type:"image/svg+xml",
    //   isUploaded:false,
    // },
    // {
    //   id: Math.random().toString(36).substring(2, 9),
    //   currentProgress: 100.00,
    //   name:"invention-icon.svg",
    //   type:"image/svg+xml",
    //   isUploaded:false,
    // }
  ])

  const cancelUpload = async (id) => {
    const selectedUpload = uploads.value.find(el => el.id === id)
    await selectedUpload?.task.cancel()
    uploads.value = uploads.value.filter(el => el.id !== id)
  }

  const pauseUpload = async (id) => {
    const selectedUpload = uploads.value.find(el => el.id === id)
    console.log('selectedUpload', selectedUpload.task)
    if (selectedUpload) {
      selectedUpload?.task.pause()
    }

  }

  const playUpload = async (id) => {
    const selectedUpload = uploads.value.find(el => el.id === id)
    console.log('selectedUpload', selectedUpload.task)
    if (selectedUpload) {
      selectedUpload?.task.resume()
    }

  }


  const getUploadedFiles = async () => {
    isLoading.value = true

    const querySnapshot = await getDocs(collection(db, "advanced-image-uploader"))

    await querySnapshot.forEach(doc => {
      filesData.value = [
        ...filesData.value,
        {
          id: doc.id,
          ...doc.data()
        }
      ]
    })
    isLoading.value = false
  }

  function uploadToStorage (file, storageName) {
    let task = null
    const advancedImageUploaderRef = storageRef(storage, `advanced-image-uploader/${storageName}`)
    task = uploadBytesResumable(advancedImageUploaderRef, file)
    return task
  }

  function stateChangedObserver (snapshot, index) {
    uploads.value[index].currentProgress = +((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2);
  }

  const completionObserver = async (file, task, storageName) => {
    const requestData = {
      name: file.name,
      storageName,
      type: file.type,
      size: file.size
    }

    requestData.url = await getDownloadURL(task.snapshot.ref)

    const docRef = await addDoc(collection(db, "advanced-image-uploader"), requestData);

    filesData.value = [
      {
        ...requestData,
        id: docRef.id
      },
      ...filesData.value,
    ]
  }

  const uploadFileToStorage = (files) => {
    [...files].forEach(async (file) => {

      const storageName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}-${file.name}`

      const task = uploadToStorage(file, storageName)

      const uploadIndex = uploads.value.push({
        id: Math.random().toString(36).substring(2, 9),
        task,
        currentProgress: 0,
        name: file.name,
        type: file.type,
        isUploaded: false
      }) - 1

      task.on('state_changed', (snapshot) => {
        stateChangedObserver(snapshot, uploadIndex)

        console.log('snapshot.state', snapshot.state)
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused', task);
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }

      }, (error) => {
        console.log('error', error, task)
      }, () => {
        completionObserver(file, task, storageName)
        uploads.value[uploadIndex].isUploaded = true
        setTimeout(() => {
          uploads.value.splice(uploadIndex, 1);
        }, 5000)
      })

    })
  }

  const deleteFile = async (id) => {
    const storageName = filesData.value.find(el => el.id === id)?.storageName
    const fileRef = storageRef(storage, `advanced-image-uploader/${storageName}`)

    await deleteObject(fileRef)
    await deleteDoc(doc(db, "advanced-image-uploader", id));

    filesData.value = filesData.value.filter(el => el.id !== id)
  }


  return {
    filesData,
    getUploadedFiles,
    isLoading,
    uploadFileToStorage,
    uploads,
    deleteFile,
    cancelUpload,
    pauseUpload,
    playUpload
  }

}
