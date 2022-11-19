import { storage } from "@/services/firebase.js";
import { ref as storageRef, uploadBytesResumable } from "firebase/storage"
import { ref } from 'vue'

export default async function useUploadToStorage (file) {
  console.log('file', file)
  let task = ref({})

  const advancedImageUploaderRef = await storageRef(storage, `advanced-image-uploader/${file.name}`)
  task.value = await uploadBytesResumable(advancedImageUploaderRef, file)

  return {task}
}
