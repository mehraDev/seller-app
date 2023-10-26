import { SELLER_USER_ID_FIELD } from "app/constants/storage";
import { searchCollection } from "firebaseServices/firestore";

async function getSellerIdByUsername(username: string): Promise<string | null> {
  try {
    const collectionPath = "sellers";
    const lowercaseUsername = username.toLowerCase();
    const sellerDocuments = await searchCollection(collectionPath, SELLER_USER_ID_FIELD, lowercaseUsername);

    if (sellerDocuments.length > 0) {
      const sellerDocument = sellerDocuments[0];
      return sellerDocument.id;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching seller ID by username:", error);
    throw new Error("Failed to fetch seller ID by username");
  }
}

export default getSellerIdByUsername;
