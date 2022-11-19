import {ref} from "vue";
import {collection, getDocs, addDoc} from "firebase/firestore";
import {db, storage} from "@/services/firebase.js";

import {ref as storageRef, uploadBytesResumable, getDownloadURL} from 'firebase/storage'

export function useAdvancedImageUploader () {

  let filesData = ref([])
  const isLoading = ref(false)
  const uploads = ref([])



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

  function uploadToStorage (file) {
    let task = null
    const advancedImageUploaderRef = storageRef(storage, `advanced-image-uploader/${file.name}`)
    task = uploadBytesResumable(advancedImageUploaderRef, file)
    return task
  }

  function stateChangedObserver (snapshot, index) {
    uploads.value[index].currentProgress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2);
  }

  const completionObserver = async (file, task) => {
    const requestData = {
      name: file.name,
      storageName: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}-${file.name}`,
      type: file.type,
      size: file.size
    }

    requestData.url = await getDownloadURL(task.snapshot.ref)

    const docRef = await addDoc(collection(db, "advanced-image-uploader"), requestData);

    filesData.value = [
      ...filesData.value,
      {
        ...requestData,
        id: docRef.id
      }
    ]
  }

  const uploadFileToStorage = (files) => {
    [...files].forEach(async (file) => {
      const task = uploadToStorage(file)

      const uploadIndex = uploads.value.push({
        task,
        currentProgress: 0,
        name: file.name,
        type: file.type,
        isUploaded: false
      }) - 1

      task.on('state_changed', (snapshot) => {
        stateChangedObserver(snapshot, uploadIndex)
      }, null, () => {
        completionObserver(file, task)
      })

    })
  }



  return {
    filesData,
    getUploadedFiles,
    isLoading,
    uploadFileToStorage,
    uploads
  }

}
