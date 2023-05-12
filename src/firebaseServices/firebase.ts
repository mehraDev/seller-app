import {initializeApp} from 'firebase/app'
import {getAnalytics} from 'firebase/analytics'
import {browserLocalPersistence, getAuth, setPersistence} from 'firebase/auth'
import firebaseConfig from './firebase-config'
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const auth = getAuth(app)
const db = getFirestore(app)
setPersistence(auth, browserLocalPersistence); 
const storage = getStorage(app);
export {app, analytics, auth, db,storage}
