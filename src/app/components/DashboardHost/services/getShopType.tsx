import { auth } from "firebaseServices/firebase";
import { fetchDocument } from "firebaseServices/firestore/document";

async function getShopType(): Promise<string | undefined> {
  try {
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const location = `sellers/${userId}/private`;
      const documentData = await fetchDocument(location, 'profile');

      if (documentData && documentData.shopType) {
        const shopType = documentData.shopType;
        return shopType;
      } else {
        console.log("Shop Type does not exist for", userId);
        return undefined;
      }
    } else {
      console.log("User is not logged in.");
      return undefined;
    }
  } catch (error) {
    console.error("Error retrieving shop type:", error);
    throw new Error("Failed to retrieve shop type");
  }
}

export default getShopType;

