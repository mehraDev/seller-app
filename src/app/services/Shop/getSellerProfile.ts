import { ISellerProfile } from "app/interfaces";
import { fetchDocument } from "firebaseServices/firestore/document";
import { getUserID } from "../Authentication";

async function getSellerProfile(): Promise<ISellerProfile | null> {
  const userId = getUserID();
  const PROFILE_LOCATION = `sellers/`;

  try {
    const data = await fetchDocument(PROFILE_LOCATION, userId || "");

    if (data) {
      const profile: ISellerProfile = {
        name: data.name,
        user: data.user,
        type: data.type,
        address: data.address,
        about: data.about,
      };
      return profile;
    }
    return null;
  } catch (error) {
    throw new Error("Failed to get seller profile");
  }
}

export default getSellerProfile;
