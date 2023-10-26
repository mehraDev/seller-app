import { fetchDocument } from "firebaseServices/firestore/document";
import { getSellerId } from "./shop";
export const SELLER_APP_ROOT = `sellers`;

async function getSellerUserName(): Promise<string | null> {
  const id = getSellerId();

  try {
    const data = await fetchDocument(SELLER_APP_ROOT, id || "");
    if (data && data.userName) {
      return data.userName;
    }

    return "";
  } catch (error) {
    throw new Error("Failed to get Seller User Name");
  }
}

export default getSellerUserName;
