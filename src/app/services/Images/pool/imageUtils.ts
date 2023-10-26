import { ImageMetadata, uploadImageWithMetadata } from "firebaseServices/Storage/uploadImageToFirebase";

const uploadPoolImage = async (imageFile: File, imageName: string, metadata: ImageMetadata, shop: string): Promise<void> => {
  const validPools = ["food", "cloth", "other"]; // Add other valid pool names here
  const poolPath = `s/${shop}/p`;

  if (!validPools.includes(shop)) {
    throw new Error(`Invalid pool name: ${shop}`);
  }
  const storageFolderPath = poolPath; // Public image storage folder path
  const firestorePoolStorage = "imagedb/sellers/" + shop; // Firestore collection path for public images
  const sanitisedName = generateCleanImageNameWithShortUUID(imageName);
  await uploadImageWithMetadata(imageFile, storageFolderPath, firestorePoolStorage, sanitisedName, metadata);
};

interface ImageData {
  image: File;
  imageName: string;
  meta: ImageMetadata;
}

const cleanImageName = (imageName: string): string => {
  imageName = imageName.toLowerCase();
  imageName = imageName.replace(/ /g, "_");
  imageName = imageName.replace(/[^a-zA-Z0-9-_\.]/g, "");
  imageName = imageName.replace(/[-_]{2,}/g, "_");
  return imageName;
};

const generateShortUUID = (): string => {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const length = 8;

  const result = Array.from({ length }, () => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters.charAt(randomIndex);
  }).join("");

  return result;
};

const generateCleanImageNameWithShortUUID = (imageName: string): string => {
  const cleanedImageName = cleanImageName(imageName);
  const shortUUID = generateShortUUID();

  const finalImageName = `${cleanedImageName}-${shortUUID}`;
  return finalImageName;
};

const uploadPoolImages = async (imagesData: ImageData[], shop: string): Promise<void> => {
  try {
    for (const data of imagesData) {
      const { image, imageName, meta } = data;
      await uploadPoolImage(image, imageName, meta, shop);
    }
  } catch (error) {
    console.log("Error Uploading Images: ", error);
    throw new Error("Images Upload Failed");
  }
};

export { uploadPoolImages, uploadPoolImage };
