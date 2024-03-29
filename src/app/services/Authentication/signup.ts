import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from "firebaseServices/firebase";
import { createDocument } from "firebaseServices/firestore";
import { generateUserID } from "./utils";
import { EShop } from "app/enums";
import { ISellerContacts, ISellerProfile } from "app/interfaces";

export interface IFormSignUp extends IProfileSignup {
  password: string;
}

export interface IProfile {
  shopName: string;
  phone: string;
  email: string;
  shopType: string;
  shopImage?: string;
}

export interface IProfileSignup {
  email: string;
  phone: string;
  shopName: string;
  shopType: EShop;
}

async function signupUserWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    throw error;
  }
}
// async function createLicense(userCredential: UserCredential): Promise<void> {
//   const date = userCredential.user.metadata.creationTime as string;
//   const licenseStartDate = new Date(date);
//   const licenseEndDate = new Date(licenseStartDate.getTime());
//   licenseEndDate.setDate(licenseEndDate.getDate() + 3);

//   const licenseData = {
//     license: "free",
//     licenseCode: "free3d",
//     startDate: licenseStartDate,
//     endDate: licenseEndDate,
//   };
//   try {
//     await createDocument(`sellers/${userCredential.user.uid}/admin`, "license", licenseData);
//   } catch (error) {
//     throw error;
//   }
// }

async function createInitialUserProfile(userCredential: UserCredential, profile: IProfileSignup): Promise<void> {
  const userID = generateUserID(profile.shopName, profile.phone);
  const userProfile: ISellerProfile = {
    user: userID,
    name: profile.shopName,
    type: profile.shopType,
    about: [],
    address: "",
  };
  const userContacts: ISellerContacts = {
    ph: [
      {
        name: profile.shopName,
        value: profile.phone,
      },
    ],
    wa: [],
    fb: [],
    insta: [],
  };

  try {
    await createDocument("sellers", userCredential.user.uid, userProfile);
  } catch (error: any) {
    throw new Error("Failed to create user profile: cannot create seller document");
  }
  try {
    await createDocument(`sellers/${userCredential.user.uid}/private`, "contacts", userContacts);
  } catch (error) {
    throw new Error("Failed to create user profile: Cannot create private collection");
  }
  try {
    await createDocument(`sellers/${userCredential.user.uid}/private`, "products", { all: [] });
  } catch (error) {
    throw new Error("Failed to create user profile: Cannot create profile collection");
  }
}

async function signupAndCreateUserProfile(data: IFormSignUp): Promise<void> {
  console.log(data);
  try {
    const result = await signupUserWithEmailAndPassword(data.email, data.password);
    const initialSignupProfile: IProfileSignup = {
      email: data.email,
      phone: data.phone,
      shopName: data.shopName,
      shopType: data.shopType,
    };
    await createInitialUserProfile(result, initialSignupProfile);
  } catch (error) {
    throw error;
  }
}

export default signupAndCreateUserProfile;
