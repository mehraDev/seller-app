import { Product } from 'app/components/features/ProductManager/interfaces/productInterface';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { auth, db } from 'firebaseServices/firebase';
import panjTaraData from "store/menu/menu";

const uploadCatalogue = async ( ): Promise<void> => {
    try {
        const user = auth.currentUser;
        if (!user) {
          throw new Error('User is not authenticated');
        }
    
        const sellerId = user.uid;
        const sellerRef = doc(db, 'sellers', sellerId);
        const productsCollectionRef = collection(sellerRef, 'products');

        await addDoc(productsCollectionRef, { productList: panjTaraData });
        console.log('Catalogue uploaded successfully!');
      } catch (error) {
        console.error('Error uploading catalogue:', error);
        throw error;
      }
};

export default uploadCatalogue;
