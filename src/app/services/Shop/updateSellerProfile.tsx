import { ISellerProfile } from 'app/interfaces';
import { updateDocument } from 'firebaseServices/firestore/document';
import { getSellerId } from './shop';
import { setSellerLogo } from './logo';
import { getImageFileFromURL } from 'ui/Image';

async function updateSellerProfile(updatedProfile: ISellerProfile, updatedLogo: string): Promise<void> {
  const id = getSellerId();
  if (!id) {
    throw new Error('Failed to update user profile: Invalid SellerId');
  }
  
  if (updatedLogo) {
    try {
      const logoFile = await getImageFileFromURL(updatedLogo);
      await setSellerLogo(logoFile);
      console.log('updated logo')
    } catch (error) {
      console.error('Error setting seller logo:', error);
      throw error;
    }

  }try {
    await updateDocument('sellers', id, updatedProfile);
  } catch (error: any) {
    throw new Error('Failed to update user profile: cannot update seller document');
  }
}

export default updateSellerProfile;
