
import {db} from "@/services/firebase.js";
import {collection, getDocs} from "firebase/firestore"

export default async function useFetchUploadedFiles () {
  let files = []
  const querySnapshot = await getDocs(collection(db, "advanced-image-uploader"))

  await querySnapshot.forEach(doc => {
    files = [
      ...files,
      {
        id: doc.id,
        ...doc.data()
      }
    ]
  })



  return files
}
