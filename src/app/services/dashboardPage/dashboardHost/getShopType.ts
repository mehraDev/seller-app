import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "firebaseServices/firebase";

async function getShopType() {
    try {
      const user = auth.currentUser;
      if (user) {
        const sellerDocRef = doc(db, "sellers", user.uid);
        const registrationDetailsSnapshot = await getDoc(sellerDocRef);
        if (registrationDetailsSnapshot.exists()) {
          const shopType = registrationDetailsSnapshot.get("shopType");
          console.log("Shop Type:", shopType);
          return shopType;
        } else {
          console.log("Shop Type does not exist for ", user.uid);
        }
      } else {
        console.log("User is not logged in.");
      }
    } catch (error) {
      console.error("Error retrieving shop type:", error);
    }
}

export default getShopType;