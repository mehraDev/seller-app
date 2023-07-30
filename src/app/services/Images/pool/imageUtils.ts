import { ImageMetadata, uploadImageWithMetadata } from "firebaseServices/Storage/uploadImageToFirebase";

// Function to upload a public image to the pool
const uploadPublicImage = async (imageFile: File, imageName: string, metadata: ImageMetadata, shop: string): Promise<void> => {
  const validPools = ["food", "cloth", "other"]; // Add other valid pool names here
  const poolPath = `s/${shop}/p`;

  // Check if the shop is a valid pool
  if (!validPools.includes(shop)) {
    throw new Error(`Invalid pool name: ${shop}`);
  }

  const storageFolderPath = poolPath; // Public image storage folder path
  const firestoreCollectionPath = "public_images/" + shop; // Firestore collection path for public images
  await uploadImageWithMetadata(imageFile, storageFolderPath, firestoreCollectionPath, imageName, metadata);
};

interface ImageData {
  image: File;
  imageName: string;
  metadata: ImageMetadata;
}

// Function to upload an array of public images to the pool
const uploadPublicImagesArray = async (imagesData: ImageData[], shop: string): Promise<void> => {
  try {
    for (const data of imagesData) {
      const { image, imageName, metadata } = data;
      await uploadPublicImage(image, imageName, metadata, shop); // Call uploadPublicImage with individual image data
    }
  } catch (error) {
    console.log("Error Uploading Images: ", error);
    throw new Error("Images Upload Failed");
  }
};

export { uploadPublicImagesArray, uploadPublicImage };
