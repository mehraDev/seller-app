import "firebase/storage";
import { uploadImageToFirebase } from "firebaseServices/Storage";

interface ImageFile extends File {}

async function uploadImages(images: ImageFile[], names: string[], location: string): Promise<void> {
  try {
    const uploadPromises: Promise<void>[] = images.map(async (image, index) => {
      const imageName = names[index];
      await uploadImageToFirebase(image, imageName, location);
    });
    await Promise.all(uploadPromises);
    console.log("Images uploaded successfully.");
  } catch (error) {
    console.error("Error uploading images:", error);
    throw new Error("Failed to upload images.");
  }
}

export default uploadImages;
