import { runTransaction } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "firebaseServices/firebase";
import { createDocument } from "firebaseServices/firestore";

interface ImageFile extends File {}

async function uploadImageToFirebase(image: ImageFile, imageName: string, location: string): Promise<void> {
  try {
    const storageRef = ref(storage);
    const imageRef = ref(storageRef, `${location}/${imageName}`);
    await uploadBytes(imageRef, image);
  } catch (error) {
    if (error.code === "storage/unauthorized") {
      throw new Error(`Permission denied. You do not have access to upload image "${imageName}" at location "${location}".`);
    } else {
      throw new Error(`Failed to upload image "${imageName}" at location "${location}". Error: ${error.message}`);
    }
  }
}

export interface ImageMetadata {
  timestamp: number;
}

const uploadImageWithMetadata = async (imageFile: File, storageFolderPath: string, firestoreCollectionPath: string, imageName: string, metadata: ImageMetadata): Promise<void> => {
  try {
    await runTransaction(db, async (transaction) => {
      // Upload image to Firebase Storage
      await uploadImageToFirebase(imageFile, imageName, storageFolderPath);

      // Get the image download URL
      const imageUrl = await getDownloadURL(ref(storage, `${storageFolderPath}/${imageName}`));

      // Store metadata in Firestore
      await createDocument(firestoreCollectionPath, "", {
        ...metadata,
        imageName,
        imageUrl,
      });
    });
  } catch (error) {
    throw error;
  }
};

export { uploadImageWithMetadata, uploadImageToFirebase };
