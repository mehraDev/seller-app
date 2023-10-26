import { ISellerContacts } from "app/interfaces";
import { fetchDocument } from "firebaseServices/firestore/document";
import { getUserID } from "../Authentication";

async function getSellerContacts(): Promise<ISellerContacts | null> {
  const userId = getUserID();
  const CONTACTS_LOCATION = `sellers/${userId}/private`;
  try {
    const data = await fetchDocument(CONTACTS_LOCATION, "contacts");
    if (data) {
      const contacts: ISellerContacts = {
        ph: data.ph,
        wa: data.wa,
        insta: data.insta,
        fb: data.fb,
      };
      return contacts;
    }
    return null;
  } catch (error) {
    throw new Error("Failed to get contacts.");
  }
}

export default getSellerContacts;
