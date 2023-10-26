import { ISellerContacts } from "app/interfaces";
import { updateDocument } from "firebaseServices/firestore/document";
import { getSellerId } from "./shop";

async function updateSellerContacts(updatedContacts: ISellerContacts): Promise<void> {
  const id = getSellerId();
  if (!id) {
    throw new Error("Failed to update seller contacts: Invalid SellerId");
  }

  try {
    await updateDocument(`sellers/${id}/private`, "contacts", updatedContacts);
    console.log("Updated seller contacts");
  } catch (error: any) {
    console.error("Error updating seller contacts:", error);
    throw new Error("Failed to update seller contacts: Cannot update contacts document");
  }
}

export default updateSellerContacts;
