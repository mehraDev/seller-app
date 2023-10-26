import { auth } from "firebaseServices/firebase";

const getUserID = () => {
  if (auth && auth.currentUser) {
    return auth.currentUser.uid;
  }
  return null;
};

export { getUserID };
