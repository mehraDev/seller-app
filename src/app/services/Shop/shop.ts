import { fetchDocument } from "firebaseServices/firestore/document";
const SELLERS_ROOT = "sellers";
async function fetchShopType(userId: string): Promise<string> {
  try {
    const location = `${SELLERS_ROOT}/${userId}/private`;
    const documentData = await fetchDocument(location, "profile");

    if (documentData && documentData.shopType) {
      const shopType = documentData.shopType;
      return shopType;
    } else {
      return "";
    }
  } catch (error) {
    throw new Error("Failed to fetch shop type");
  }
}

export { fetchShopType };
