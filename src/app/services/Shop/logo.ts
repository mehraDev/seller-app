import { getSellerId } from "app/services/Shop";
import { getUrlImageStorage, uploadImageToFirebase } from "firebaseServices/Storage";
import { getFileExtension } from "ui/Image";
import resizeImage from "ui/Image/utils/resizeImage";
import validateAspectRatio from "ui/Image/utils/validateAspectRatio";

const SELLER_APP_ROOT = "s";
const SELLERS_COLLECTION = "sellers";
const LOGO_FOLDER = "logo";

export enum LogoSizes {
  Small = 48, // Smaller devices, lower resolution
  Medium = 72, // Medium devices, medium resolution
  Large = 96, // Larger devices, high resolution
  ExtraLarge = 128, // Extra large devices, very high resolution
  Ultra = 192, // Ultra devices like high-res tablets, laptops
  PwaDefault = 512, // Standard recommended size for PWAs
}

function getSellerLogo(size?: LogoSizes): string {
  try {
    const sellerId = getSellerId();
    const logoSize = size ? size : LogoSizes.Ultra;

    if (sellerId) {
      const SELLER_LOGO_LOCATION = `${SELLER_APP_ROOT}/${SELLERS_COLLECTION}/${sellerId}/${LOGO_FOLDER}/logo_${logoSize}.png`;

      const timestamp = new Date().getTime();
      const storageUrl = `${getUrlImageStorage(SELLER_LOGO_LOCATION)}`;
      const storageUrlTimestamp = `${getUrlImageStorage(SELLER_LOGO_LOCATION)}?alt=media&timestamp=${timestamp}`;
      return size ? storageUrl : storageUrlTimestamp;
    } else {
      return "";
    }
  } catch (error) {
    console.error("Error getting seller profile image:", error);
    return "";
  }
}

const setSellerLogo = async (file: File): Promise<void> => {
  const logoSizesArray = [LogoSizes.Small, LogoSizes.Medium, LogoSizes.Large, LogoSizes.ExtraLarge, LogoSizes.Ultra, LogoSizes.PwaDefault];
  try {
    const sellerId = getSellerId();
    if (!sellerId) {
      throw new Error("Invalid sellerId");
    }

    const logoFolder = `${SELLER_APP_ROOT}/${SELLERS_COLLECTION}/${sellerId}/${LOGO_FOLDER}/`;
    const uploadTasks = logoSizesArray.map(async (size) => {
      const resizedLogo = await resizeImage(file, size, size);
      const logoSizeName = `logo_${size}.png`;
      await uploadImageToFirebase(resizedLogo, logoSizeName, logoFolder);
    });

    await Promise.all(uploadTasks);
  } catch (error) {
    console.error("Error setting seller logo:", error);
    throw new Error("Failed to set seller logo");
  }
};

export { getSellerLogo, setSellerLogo };
