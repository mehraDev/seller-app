import { useEffect, useState } from "react";
import Button from "ui/Button";
import Icon, { IconName } from "ui/Icon";
import { Col, Row, Text } from "ui/basic";
import { InputText } from "ui/Form";
import { ISellerProfile } from "app/interfaces";
import { useTheme } from "styled-components";
import ImageWithFallback from "ui/ImageWithFallback";
import { getSellerLogo } from "app/services/Shop";
import Logo from '../../../../../assets/shop/logo-gray-placeholder.png';
import InputImageButton from "ui/Form/Inputs/InputImage";
import getSellerIdByUsername from "app/services/Shop/getSellerIdByUsername";
import PopupWarning from "ui/Popup/PopupWarning";
import { ImageUploadWithPreview } from "ui/Image";

interface IProfileEditorProps {
  profile: ISellerProfile;
  onSave: (updatedProfile: ISellerProfile,updatedLogo:string) => void;
  onClose: () => void;
  logo: string;
}

function ProfileEditor({logo, profile, onSave, onClose }: IProfileEditorProps) {
  const theme = useTheme();
  const [editedProfile, setEditedProfile] = useState<ISellerProfile>(profile);
  const [showDeleteLogoConfirmation, setShowDeleteLogoConfirmation] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string >( logo);
  const [userNameAvailabilityStatus, setUserNameAvailabilityStatus] = useState<
    "checking" | "available" | "unavailable" | 'error' | "invalid/same"
  >("checking");

  const isValidNewUserName =
  editedProfile.user.trim().length >= 5 &&
  editedProfile.user.toLowerCase() !== profile.user.toLowerCase();

  useEffect(() => {
    const checkUsernameAvailability = async () => {
    if (isValidNewUserName) {
      setUserNameAvailabilityStatus("checking");
      try {
        const sellerId = await getSellerIdByUsername(editedProfile.user);
        if (sellerId) {
          setUserNameAvailabilityStatus("unavailable");
        } else {
          setUserNameAvailabilityStatus("available");
        }
      } catch (error) {
        console.error("Error checking username availability:", error);
        setUserNameAvailabilityStatus("error");
      }
    } else {
      setUserNameAvailabilityStatus("invalid/same");
    }
  }
  checkUsernameAvailability();
  }, [editedProfile.user, isValidNewUserName]);
    
  const handleSave = () => {
    const lowercaseProfile = {

      ...editedProfile,
      user: editedProfile.user.toLowerCase(),
      name: editedProfile.name.toLowerCase(),
      about: editedProfile.about.map((about) => about.toLowerCase()),
      address: editedProfile.address.toLowerCase(),
    };
    const updatedLogo = logo === logoUrl ? '' : logoUrl
    onSave(lowercaseProfile , updatedLogo);
  };

  const handleNameChange = (value: string) => {
    setEditedProfile((prevProfile) => ({
      ...prevProfile!,
      name: value,
    }));
  };

  const handleUserChange = (value: string) => {
    setEditedProfile((prevProfile) => ({
      ...prevProfile!,
      user: value.toLowerCase(),
    }));
    
  };

  const handleAboutChange = (about: string[]) => {
    setEditedProfile((prevProfile) => ({
      ...prevProfile!,
      about,
    }));
  };

  const handleAddressChange = (value: string) => {
    setEditedProfile((prevProfile) => ({
      ...prevProfile!,
      address: value,
    }));
  };

  const addAbout = () => {
    if (editedProfile && editedProfile.about.length < 4) {
      setEditedProfile((prevProfile) => ({
        ...prevProfile!,
        about: [...prevProfile!.about, ""],
      }));
    }
  };

  const deleteAbout = (index: number) => {
    if (editedProfile) {
      const newAbout = [...editedProfile.about];
      newAbout.splice(index, 1);
      setEditedProfile((prevProfile) => ({
        ...prevProfile!,
        about: newAbout,
      }));
    }
  };

  const handleImageChange = (image: File | null) => {
    setLogoUrl("");
    if (image) {
      const imageUrl = URL.createObjectURL(image);
      setLogoUrl(imageUrl);
    }
  };
  

  const shopNameError = !editedProfile?.name ? 'Shop Name is required. Please enter a shop name.' : '';

  const usernameErrorMessage = (editedProfile?.user.trim() === "")
    ?
    'Username is required. Please enter a username.'
    :
    (editedProfile?.user.trim().length < 5)
    ?
      'Username should be at least 5 characters long.'
    :
    '';

  const userNameDescription = <>
    {isValidNewUserName && (
        <Text mb="4px">
          {userNameAvailabilityStatus === "checking" && (
            <span>Checking username availability...</span>
          )}
          {userNameAvailabilityStatus === "available" && (
            <span style={{ color: 'green' }}>Username available</span>
          )}
          {userNameAvailabilityStatus === "unavailable" && (
            <span style={{ color: 'red' }}>Username not available</span>
          )}
        </Text>
      )}
    <Text mb="4px">Your username will be part of your shop's web address, like <i style={{color: theme.brandColor.primaryBorderHover}}>digibhoomi.com/username</i>.</Text>
    <Text>Username should be at least 5 characters long and can only contain valid characters (letters, numbers, and underscores).</Text>
    </>;
  
  const aboutDescription = `Please provide a brief description of your shop. For instance, you can begin with 'Italian' as your first description. If you wish to add more, simply enter each description separately. Each description should be concise and focus on a single aspect of your shop.`;
  
  const isAnyAboutEmpty  = editedProfile.about.length === 0 || editedProfile.about.some(description => description.trim() === '');
  
  const areChangesMade =
  editedProfile.name !== profile.name ||
  editedProfile.user !== profile.user ||
  editedProfile.about.join() !== profile.about.join() ||
  editedProfile.address !== profile.address ||
  logoUrl !== getSellerLogo();

  const isSaveEnabled =
  areChangesMade &&
  (isValidNewUserName || userNameAvailabilityStatus === "available" || editedProfile.user.toLowerCase() === profile.user.toLowerCase()) &&
  !!editedProfile?.name.trim();
  
  const handleDeleteLogo = () => {
    setLogoUrl('')
    setShowDeleteLogoConfirmation(false)
  }
  const handleEditLogo = (newLogo: string) => {
    setLogoUrl(newLogo);
  }
  const deleteLogoTitle = 'Delete Shop Logo ?';
  const deleteLogoMessage  = `Are you sure you want to delete your shop's logo?`
  console.log('logoUrl',logoUrl)
  return (
    <>
      <Row a='center' j='between' style={{ borderBottom: '1px solid ' + theme.neutralColor.border }} p={'1rem 1rem'}>
        <Text s='16' w={6} c={theme.neutralColor.text}>Edit Profile</Text>
        <Icon height={1.2} width={1.2} name={IconName.Close} color='#bd1414' onClick={() => onClose()} />
      </Row>
      <Col h="100%" style = {{overflow: 'scroll', gap:'2rem'}} p='2rem 1rem'>
        <Row a="center" j='center'>
          <Row w="initial" style={{position: 'relative'}}>
            {logoUrl ?
            <Row w="initial" onClick={() => setShowDeleteLogoConfirmation(true)} style={{position:'absolute' , right:'-0.5rem', top:'-0.5rem',background: theme.neutralColor.bgContainer, boxShadow: theme.shadow.boxShadowTertiary }} p='0.25rem' br="28%" >
                <Icon  color={theme.errorColor.errorActive} name={IconName.Xmark}/>
            </Row>
            :
            null}
            <ImageWithFallback src={logoUrl} key={logoUrl} fallbackImage={Logo} alt={editedProfile.name + ' logo'}/>
            <Row w="initial" style={{position:'absolute' , right:'-0.5rem', bottom:'-0.5rem',background: theme.neutralColor.bgContainer, boxShadow: theme.shadow.boxShadowTertiary }} p='0.25rem' br="28%" >
              <ImageUploadWithPreview aspectRatio={1} onUpload={handleEditLogo} >
                <Icon color={theme.brandColor.primary} name={IconName.Edit}/>
              </ImageUploadWithPreview>
            </Row>
            <PopupWarning title={deleteLogoTitle} message={deleteLogoMessage} show={showDeleteLogoConfirmation} onCancel={() => setShowDeleteLogoConfirmation(false)} onConfirm={handleDeleteLogo} />
          </Row>
        </Row>
        <InputText tt="cap" error={shopNameError} required={true} value={editedProfile?.name} onChange={handleNameChange} label="Business Name"/>
        <Col m='0 0 4rem'>
          <InputText tt="cap"  error={usernameErrorMessage} description={userNameDescription} value={editedProfile?.user} onChange={handleUserChange} label="Username"/>
        </Col>
        <Col style={{gap:'1rem'}}>
          <Row><Text>About</Text></Row>
          <Row p={'1rem'}>
            <Text s="12" w={5} c={theme.neutralColor.textTertiary}>
              {aboutDescription}
            </Text>  
          </Row>
          <Row style={{ gap: "1rem" }} a='center'>
              <InputText width="90%" tt="cap" value={editedProfile?.about[0] || ""} onChange={(value) => handleAboutChange([value, ...editedProfile!.about.slice(1)])} />
          </Row>
          {editedProfile?.about.slice(1).map((item, index) => (
            <Row key={index} style={{ gap: "1rem" }} a='center'>
              <InputText width="90%" tt="cap" value={item} onChange={(value) => handleAboutChange([...editedProfile!.about.slice(0, index + 1), value, ...editedProfile!.about.slice(index + 2)])} />
              <Icon name={IconName.Delete} color={theme.brandColor.red} onClick={() => deleteAbout(index + 1)} />
            </Row>
          ))}
          {editedProfile?.about.length < 4 && (
            <Row p='1rem' a="center" j='center'><Button disabled={isAnyAboutEmpty}  onClick={addAbout}>Add More</Button></Row>
          )}
        </Col>
        <InputText tt="cap" value={editedProfile?.address || ""} onChange={handleAddressChange} label="Address"/>
      </Col>
      <Row j="center" a="center" style={{gap:'1rem'}} p={'2rem 1rem'}>
        <Button width="100%" type="button" onClick={onClose} >Close</Button>
        <Button width="100%" onClick={ handleSave} disabled={!isSaveEnabled}>Save</Button>
      </Row>
    </>
  );
}

export default ProfileEditor;
