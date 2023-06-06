import { doc, setDoc } from 'firebase/firestore';
import { db } from 'firebaseServices/firebase';

async function createDocument(location: string, documentId: string,data?: any): Promise<void> {
  try {
    const documentRef = doc(db, location, documentId);
    const documentData = data || {};
    await setDoc(documentRef, documentData);
    console.log(`Document created successfully at: ${location} ${documentId}` );
  } catch (error: any) {
    console.error('Error creating document:', error);
    throw new Error('Failed to create document');
  }
}

export default createDocument;
