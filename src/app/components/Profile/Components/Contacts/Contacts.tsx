import React, { useState } from "react";
import Icon, { IconName } from "ui/Icon";
import ContactPopup, { IContactButtonOverlay } from "../ProfileCard/ContactPopup/ContactPopup";
import { ISellerContacts } from "app/interfaces";
import { Col, Row, Text } from "ui/basic";
import { useTheme } from "styled-components";
import { Drawer } from "ui/Drawer";
import ContactsEditor from "../ContactsEditor/ContactsEditor";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { Backdrop } from "ui/Backdrop";
import { LoadingAnimation } from "ui/LoadingAnimation";
import { PopupStatus } from "ui/Popup";
import updateSellerContacts from "app/services/Shop/updateSellerContacts";
import { fetchContacts } from "store/modules/contactsSlice";
import { EPopupModes } from "ui/Popup/PopupStatus";

interface IContacts {
  editMode: boolean;
  closeEditMode: () => void
}

const Contacts: React.FC<IContacts> = ({editMode,closeEditMode}) => {
  const { list: sellerContacts } = useSelector((state: RootState) => state.contacts);
  const dispatch = useDispatch<AppDispatch>();
  const [isUploading, setIsUploading] = useState(false);
  const theme = useTheme();
  const [popupStatus, setPopupStatus] = useState<EPopupModes>(EPopupModes.None);
  const phone = sellerContacts?.ph || [];
  const wa = sellerContacts?.wa || [];
  const insta = sellerContacts?.insta || [];
  const fb = sellerContacts?.fb || [];

  const [contactOverlay, setContactOverlay] = useState<
    | IconName.Phone
    | IconName.Whatsapp
    | IconName.Facebook
    | IconName.Instagram
    | ""
  >("");

  const phoneColor = "#0762e1";
  const waColor = "#0ba544";
  const fbColor = "#1166d5";
  const igColor = "#ed1a60";

  const handleContactClick = (index: number) => {
    if (contactOverlay === IconName.Phone) {
      window.location.href = `tel:${phone[index].value}`;
    } else if (contactOverlay === IconName.Whatsapp) {
      const whatsappNumber = wa[index].value;
      window.location.href = `https://wa.me/${whatsappNumber}`;
    } else if (contactOverlay === IconName.Facebook) {
      const facebookUsername = fb[index].value;
      window.open(`https://www.facebook.com/p/${facebookUsername}`, "_blank");
    } else if (contactOverlay === IconName.Instagram) {
      const instagramUsername = insta[index].value;
      window.open(`https://www.instagram.com/${instagramUsername}`, "_blank");
    }
    setContactOverlay("");
  };

  const handleIconClick = (
    name:
      | IconName.Phone
      | IconName.Whatsapp
      | IconName.Facebook
      | IconName.Instagram
  ) => {
    setContactOverlay(name);
  };

  let contactButtons: IContactButtonOverlay[] = [];

  if (contactOverlay === IconName.Phone) {
    contactButtons = phone.map((item) => ({
      contact: { name: item.name, value: item.value },
      color: phoneColor,
      iconName: IconName.Phone,
    }));
  } else if (contactOverlay === IconName.Whatsapp) {
    contactButtons = wa.map((item) => ({
      contact: { name: item.name, value: item.value },
      color: waColor,
      iconName: IconName.Whatsapp,
    }));
  } else if (contactOverlay === IconName.Facebook) {
    contactButtons = fb.map((item) => ({
      contact: { name: item.name, value: item.value },
      color: fbColor,
      iconName: IconName.Facebook,
    }));
  } else if (contactOverlay === IconName.Instagram) {
    contactButtons = insta.map((item) => ({
      contact: { name: item.name, value: item.value },
      color: igColor,
      iconName: IconName.Instagram,
    }));
  }
 
  const handleUpdateContacts = async (updatedContacts: ISellerContacts) => {
    setIsUploading(true); 
    try {
      await updateSellerContacts(updatedContacts);
      setPopupStatus(EPopupModes.Success);
    } catch (error) {
      console.error('Error updating contacts:', error);
      setPopupStatus(EPopupModes.Error)
      // Handle the error, e.g., show a message to the user
    } finally {
      setIsUploading(false); 
    }
  }

  const handleClosePopupStatus = () => {
    if(popupStatus === 'success') {
      closeEditMode();
      dispatch(fetchContacts());
    }
    setPopupStatus(EPopupModes.None);

  }

  return (
    <Col p='0 0 2rem' style={{ background: theme.neutralColor.bgContainer}}>
      <Row p='1rem' >
        <Text s="16" w={6}>Contact Information</Text>
      </Row>
      <Row p='0.5rem'>
        <Col p='0 0 2rem' style={{border: '1px solid '+ theme.neutralColor.borderSecondary}} br="12px">
          <Row a='center' p='1rem' style={{gap:'0.5rem'}}>
            <Icon
              borderRadius={0.35}
              name={IconName.Phone}
              color={phoneColor}
              width={1.2}
              height={1.2}
              onClick={() => handleIconClick(IconName.Phone)}
            />
            <Text s="18" w={6} c={phoneColor}>Phone</Text>
          </Row>
            <Col m='0 2rem' w="initial" p={'0.5rem'} style={{borderLeft: '2px solid ' + phoneColor}}>
            {phone.length !== 0 ? (
            <Col style={{ gap:'1rem'}} p='0.5rem'>
              {phone.map((item, index) => (
                <Col key={index} style={{gap:'0.5rem'}}>
                  <Text s="14" w={5}>{item.name}</Text>
                  <Text s="14" ml="8px" c={theme.neutralColor.textSecondary}>{item.value}</Text>
                </Col>
              ))}
            </Col>
          ) : (
            <Text s="14" color={theme.neutralColor.textQuaternary} style={{ marginLeft: '24px' }}>No Phone numbers added</Text>
          )}
            </Col>
          
        </Col>
      </Row>
      
      <Row p='0.5rem'>
  <Col p='0 0 2rem' style={{ border: '1px solid ' + theme.neutralColor.borderSecondary }} br="12px">
    <Row a='center' p='1rem' style={{ gap: '0.5rem' }}>
      <Icon
        borderRadius={0.35}
        name={IconName.Whatsapp}
        width={1.2}
        height={1.2}
        color={waColor}
        onClick={() => handleIconClick(IconName.Whatsapp)}
      />
      <Text s="18" w={6} c={waColor}>WhatsApp</Text>
    </Row>
    <Col m='0 2rem' w="initial" p={'0.5rem'} style={{ borderLeft: '2px solid ' + waColor }}>
      {wa.length !== 0 ? (
        <Col style={{ gap: '1rem' }} p='0.5rem'>
          {wa.map((item, index) => (
            <Col key={index} style={{ gap: '0.5rem' }}>
              <Text s="14" w={5}>{item.name}</Text>
              <Text s="14" ml="8px" c={theme.neutralColor.textSecondary}>{item.value}</Text>
            </Col>
          ))}
        </Col>
      ) : (
        <Text s="14" color={theme.neutralColor.textQuaternary} style={{ marginLeft: '24px' }}>No WhatsApp numbers added</Text>
      )}
    </Col>
  </Col>
      </Row>
      <Row p='0.5rem'>
        <Col p='0 0 2rem' style={{ border: '1px solid ' + theme.neutralColor.borderSecondary }} br="12px">
          <Row a='center' p='1rem' style={{ gap: '0.5rem' }}>
            <Icon
              borderRadius={0.35}
              name={IconName.Instagram}
              width={1.2}
              height={1.2}
              color={igColor}
              onClick={() => handleIconClick(IconName.Instagram)}
            />
            <Text s="18" w={6} c={igColor}>Instagram</Text>
          </Row>
          <Col m='0 2rem' w="initial" p={'0.5rem'} style={{ borderLeft: '2px solid ' + igColor }}>
            {insta.length !== 0 ? (
              <Col style={{ gap: '1rem' }} p='0.5rem'>
                {insta.map((item, index) => (
                  <Col key={index} style={{ gap: '0.5rem' }}>
                    <Text s="14" w={5}>{item.name}</Text>
                    <Text s="14" ml="8px" c={theme.neutralColor.textSecondary}>{item.value}</Text>
                  </Col>
                ))}
              </Col>
            ) : (
              <Text s="14" color={theme.neutralColor.textQuaternary} style={{ marginLeft: '24px' }}>No Instagram profiles added</Text>
            )}
          </Col>
        </Col>
      </Row>
      <Row p='0.5rem'>
        <Col p='0 0 2rem' style={{ border: '1px solid ' + theme.neutralColor.borderSecondary }} br="12px">
          <Row a='center' p='1rem' style={{ gap: '0.5rem' }}>
            <Icon
              borderRadius={0.35}
              name={IconName.Facebook}
              width={1.2}
              height={1.2}
              color={fbColor}
              onClick={() => handleIconClick(IconName.Facebook)}
            />
            <Text s="18" w={6} c={fbColor}>Facebook</Text>
          </Row>
          <Col m='0 2rem' w="initial" p={'0.5rem'} style={{ borderLeft: '2px solid ' + fbColor }}>
            {fb.length !== 0 ? (
              <Col style={{ gap: '1rem' }} p='0.5rem'>
                {fb.map((item, index) => (
                  <Col key={index} style={{ gap: '0.5rem' }}>
                    <Text s="14" w={5}>{item.name}</Text>
                    <Text s="14" ml="8px" c={theme.neutralColor.textSecondary}>{item.value}</Text>
                  </Col>
                ))}
              </Col>
            ) : (
              <Text s="14" color={theme.neutralColor.textQuaternary} style={{ marginLeft: '24px' }}>No Facebook profiles added</Text>
            )}
          </Col>
        </Col>
      </Row>
      {contactOverlay && (
        <ContactPopup
          onContact={handleContactClick}
          contactButtons={contactButtons}
          onClose={() => setContactOverlay("")}
          name={contactOverlay}
        />
      )}
      <Drawer h='99%' isOpen={editMode}>
            <Col h='100%' style={{background: theme.neutralColor.bgContainer , borderRadius: '8px 8px 0 0 '}}>
                {sellerContacts ? <ContactsEditor onClose={closeEditMode} onSave={handleUpdateContacts} contacts={sellerContacts} />
                : <div>Oops! Some error occured</div>
                }
            </Col>
      </Drawer>
      {isUploading && 
              <Backdrop>
                <LoadingAnimation />
                </Backdrop>          
          }
          <PopupStatus mode={popupStatus} onClose={handleClosePopupStatus}/>
   </Col>
  );
  
  
};

export default Contacts;
