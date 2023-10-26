import Button from 'ui/Button';
import { Col, Row } from 'ui/basic';
import { logout } from 'firebaseServices/Authentication';
import { useTheme } from 'styled-components';
import ProfileCard from './Components/ProfileCard';
import Contacts from './Components/Contacts/Contacts';
import { useOptionsButton } from '../Dashboard';
import { useEffect, useState } from 'react';
import { OptionsCard } from 'ui/OptionsCard';
import { Drawer } from 'ui/Drawer';
import { ISellerProfile } from 'app/interfaces';
import ProfileEditor from './Components/ProfileEditor/ProfileEditor';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store/store';
import { LoadingAnimation } from 'ui/LoadingAnimation';
import updateSellerProfile from 'app/services/Shop/updateSellerProfile';
import { Backdrop } from 'ui/Backdrop';
import { PopupStatus } from 'ui/Popup';
import { fetchProfile } from 'store/modules/profileSlice';
import { EPopupModes } from 'ui/Popup/PopupStatus';

interface IProfile {
}
enum EProfileMode {
  Viewer = 'viewer',
  ProfileEditor = 'editProfile',
  ContactsEditor = 'editContacts'
}
const Profile: React.FC<IProfile> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { profile, isLoading } = useSelector((state: RootState) => state.user);
  const theme = useTheme();
  const [mode,setMode] = useState<EProfileMode>(EProfileMode.Viewer)
  const [popupStatusMode, setPopupStatusMode] = useState<EPopupModes>(EPopupModes.None);

  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  const {setDisplayOptions,displayOptions,setHasOptionButton} = useOptionsButton();
  const handleLogout = async () => {
    await logout();
  };
  useEffect(()=>{
    setHasOptionButton(true);
    return () => {
      setHasOptionButton(false);
    };
  },[setHasOptionButton]);

  const handleEditProfile = () => {
    setMode(EProfileMode.ProfileEditor);
  };

  const handleEditContacts = () => {
    setMode(EProfileMode.ContactsEditor);
  };
  const handleCloseEditor = () => {
    setMode(EProfileMode.Viewer)
  }
  const handleCloseProfileMode = () => {
    setMode(EProfileMode.Viewer);
  }

  const handleUpdateProfile = async (updatedProfile: ISellerProfile, updatedLogo:string) => {
    try {
      setIsUpdatingProfile(true);
      await updateSellerProfile(updatedProfile, updatedLogo);
      setPopupStatusMode(EPopupModes.Success);
    } catch (error) {
      console.error('Error updating profile:', error);
      setPopupStatusMode(EPopupModes.Error)
    } finally {
      setIsUpdatingProfile(false);
      console.log('completed updating profile');
    }
  };

  const handleClosePopupStatus = () => {
    if(popupStatusMode === 'success') {
      setMode(EProfileMode.Viewer);
      dispatch(fetchProfile());
    }
    setPopupStatusMode(EPopupModes.None);

  }

  const options = [
    { label: 'Edit Profile' , onClick : handleEditProfile  },
    { label: 'Edit Contacts', onClick: handleEditContacts },
  ];

  if (!profile || isLoading) {
    return (
      <Col style={{background: theme.neutralColor.fillQuaternary}}>
      {
        isLoading ? 
        <LoadingAnimation />  :
        <div>Oops! Some error occured.</div>
      }
      </Col>
    );
  }
  const logoUrl = 'getSellerLogo()';
  return (
    <Col style={{background: theme.neutralColor.fillQuaternary}}>
      <Row p='0.5rem 0rem' >
        <ProfileCard logo={logoUrl} profile={profile}/>
      </Row>
      <Row  p='0.5rem 0rem' >
        <Contacts editMode={mode === EProfileMode.ContactsEditor} closeEditMode={handleCloseEditor}/>
      </Row>
      <Row p='0.5rem 0rem 0'>
        <Row p='1rem 1rem  2rem' style={{background: theme.neutralColor.bgContainer, boxShadow: 'rgba(0, 0, 0, 0.069) 0px 1px 4px'}}>
          <Button  width='100%' onClick={handleLogout}>Log out</Button>
        </Row>
      </Row>
      <Drawer h='99%' isOpen={mode === EProfileMode.ProfileEditor}>
          <Col h='100%' style={{background: theme.neutralColor.bgContainer , borderRadius: '8px 8px 0 0 '}}>
              <ProfileEditor logo={logoUrl} onClose={handleCloseProfileMode} onSave={handleUpdateProfile} profile={profile} />
            </Col>
      </Drawer>
      {displayOptions &&
        <OptionsCard options={options} closeCard={() => setDisplayOptions(false)}/>
      }
      {isUpdatingProfile && 
              <Backdrop>
                <LoadingAnimation />
                </Backdrop>          
      }
      <PopupStatus mode={popupStatusMode} onClose={handleClosePopupStatus}/>
    </Col>
  );
};

export default Profile;
