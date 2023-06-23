
import { fetchDocument } from "firebaseServices/firestore/document";
import { getUserID } from "./getUserID";

async function getShopType(): Promise<string | 0> {
  const userId = getUserID();
  const PROFILE_LOCATION = `sellers/${userId}/private`;
  try {
    const documentData = await fetchDocument(PROFILE_LOCATION, 'profile');

    if (documentData && documentData.shopType) {
      const shopType = documentData.shopType;
      return shopType;
    } 
    
    return 0;
  } catch (error) {
    throw new Error("Failed to get shop type");
  }
}

export default getShopType;

