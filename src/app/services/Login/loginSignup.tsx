import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'firebaseServices/firebase';

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User logged in:', user);
    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error('Login error:', errorCode, errorMessage);
    throw error;
  }
};
