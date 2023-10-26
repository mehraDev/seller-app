import { auth } from "firebaseServices/firebase";

const getSellerId = () => {
  try {
    const user = auth.currentUser;
    if (user) {
      return user.uid;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting current seller ID from Firebase Auth:", error);
    return null;
  }
};

export { getSellerId };
