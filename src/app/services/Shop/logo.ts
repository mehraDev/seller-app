import { getSellerId } from "app/services/Shop";
import { getUrlImageStorage, uploadImageToFirebase } from "firebaseServices/Storage";

const SELLER_APP_ROOT = "s";
const SELLERS_COLLECTION = "sellers";
const LOGO = "logo";

function getSellerLogo(): string {
  try {
    const sellerId = getSellerId();
    if (sellerId) {
      const SELLER_LOGO_LOCATION = `${SELLER_APP_ROOT}/${SELLERS_COLLECTION}/${sellerId}/${LOGO}`;

      const timestamp = new Date().getTime();
      const storageUrl = `${getUrlImageStorage(SELLER_LOGO_LOCATION)}?alt=media&timestamp=${timestamp}`;
      return storageUrl;
    } else {
      return "";
    }
  } catch (error) {
    console.error("Error getting seller profile image:", error);
    return "";
  }
}

async function setSellerLogo(file: File) {
  try {
    const sellerId = getSellerId();
    if (sellerId) {
      const SELLER_LOGO_LOCATION = `${SELLER_APP_ROOT}/${SELLERS_COLLECTION}/${sellerId}/`;
      await uploadImageToFirebase(file, LOGO, SELLER_LOGO_LOCATION);
    } else {
      throw new Error("Invalid selledId");
    }
  } catch (error) {
    console.error("Error setting seller logo:", error);
    throw new Error("Failed to set seller logo");
  }
}

export { getSellerLogo, setSellerLogo };
