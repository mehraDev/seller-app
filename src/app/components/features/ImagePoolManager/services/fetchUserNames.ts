import { fetchDocument } from "firebaseServices/firestore";

async function fetchUserNames(sellerIDs: string[]): Promise<string[]> {
    try {
      const userNames: string[] = [];
  
      for (const sellerID of sellerIDs) {
        const documentData = await fetchDocument("sellers", sellerID);
        if (documentData && documentData.usr) {
          const userName = documentData.usr;
          userNames.push(userName);
        }
      }
      return userNames;
    } catch (error) {
      console.error("Error fetching user names:", error);
      throw new Error("Failed to fetch user names");
    }
  }
  
export default fetchUserNames;
