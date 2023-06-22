import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { auth } from 'firebaseServices/firebase';
import { createDocument } from 'firebaseServices/firestore';

interface SellerSignUpData {
    firstName: string;
    lastName: string;
    shopName: string;
    phone: string;
    email: string;
    password: string;
    shopType: string;
  }

  interface Profile {
    firstName: string;
    lastName: string;
    shopName: string;
    phone: string;
    email: string;
    shopType: string;
  }

async function signupUserWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      throw error;
    }
}

async function createLicense(userCredential: UserCredential) : Promise<void> {
  const date = userCredential.user.metadata.creationTime as string;
  const licenseStartDate = new Date(date);
  const licenseEndDate = new Date(licenseStartDate.getTime());
  licenseEndDate.setDate(licenseEndDate.getDate() + 3);

  const licenseData = {
    license: 'free',
    licenseCode: 'free3d',
    startDate:  licenseStartDate,
    endDate: licenseEndDate,
  };
  try {
    await createDocument(`sellers/${userCredential.user.uid}/admin`,'license', licenseData)
  } catch (error) {
    throw error;
  }
}

  async function createUserProfile(userCredential: UserCredential, profile: Profile): Promise<void> {
    try {
        await createDocument('sellers', userCredential.user.uid);
      } catch (error: any) {
        throw new Error('Failed to create user profile: cannot create seller document');
      }
    try {
        await createDocument(`sellers/${userCredential.user.uid}/private`, 'profile', profile);
      } catch (error) {
        throw new Error('Failed to create user profile: Cannot create private collection');
      }
  }
  
  async function signupAndCreateUserProfile(data: SellerSignUpData): Promise<void> {
    const { email, password, firstName, lastName,shopName,phone,shopType } = data;
    const profile = {
      firstName,
      lastName,
      shopName,
      shopType,
      phone,
      email
    }
    try {
      const result = await signupUserWithEmailAndPassword(email, password);
      await createUserProfile(result, profile);
      await createLicense(result);
    } catch (error) {
      throw error;
    }
    
  };

  export default signupAndCreateUserProfile;