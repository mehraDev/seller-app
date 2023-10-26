import { ISellerContacts } from 'app/interfaces';
import { IContactItem } from 'app/interfaces/Shop/Contacts';
import { useMemo, useState } from 'react';
import { useTheme } from 'styled-components';
import Button from 'ui/Button';
import {  InputTelephone, InputText } from 'ui/Form';
import Icon, { IconName } from 'ui/Icon';
import { Col, Row, Text } from 'ui/basic';

interface IContactsEditor {
  onClose: () => void;
  onSave: (updatedContacts: ISellerContacts) => void;
  contacts: ISellerContacts ;
}

function ContactsEditor({ onClose, onSave, contacts }: IContactsEditor) {
  const theme = useTheme();
  const [phone, setPhone] = useState(contacts.ph.map(contact => ({ ...contact })));
  const [whatsapp, setWhatsapp] = useState(contacts.wa.map(contact => ({ ...contact })));
  const [instagram, setInstagram] = useState(contacts.insta.map(contact => ({ ...contact })));
  const [facebook, setFacebook] = useState(contacts.fb.map(contact => ({ ...contact })));

  
  const initialContactsState = useMemo(() => ({
    phone: contacts.ph,
    whatsapp: contacts.wa,
    instagram: contacts.insta,
    facebook: contacts.fb,
  }), [contacts.ph, contacts.wa, contacts.insta, contacts.fb]);


   const isSaveDisabled =  useMemo(() => {
    return (
      phone.some((contact) => !contact.name || !contact.value) ||
      whatsapp.some((contact) => !contact.name || !contact.value) ||
      instagram.some((contact) => !contact.name || !contact.value) ||
      facebook.some((contact) => !contact.name || !contact.value) ||
      JSON.stringify(initialContactsState) === JSON.stringify({
        phone,
        whatsapp,
        instagram,
        facebook,
      })
    );
  }, [phone, whatsapp, instagram, facebook, initialContactsState]);

  enum EContacts {
    Phone = 'Phone',
    WhatsApp = 'WhatsApp',
    Instagram = 'Instagram',
    Facebook = 'Facebook',
  }

  const handleSave = () => {
    const updatedContacts = {
      ph: phone,
      wa: whatsapp,
      insta: instagram,
      fb: facebook,
    };
    onSave(updatedContacts);
  };
  

  const handleClose = () => {
    onClose();
  };

  const handleAddNewContact = (type: EContacts) => {
    const newContactItem: IContactItem = {
      name: '',
      value: '',
    };
  
    let updatedArray: IContactItem[] = [];

    switch (type) {
      case EContacts.Phone:
        updatedArray = [...phone, newContactItem];
        setPhone(updatedArray);
        break;
      case EContacts.WhatsApp:
        updatedArray = [...whatsapp, newContactItem];
        setWhatsapp(updatedArray);
        break;
      case EContacts.Instagram:
        updatedArray = [...instagram, newContactItem];
        setInstagram(updatedArray);
        break;
      case EContacts.Facebook:
        updatedArray = [...facebook, newContactItem];
        setFacebook(updatedArray);
        break;
      default:
        break;
    }
  };
  

  const handleDeleteContact = (type: EContacts, contactIndex: number) => {
    let updatedArray: IContactItem[] = [];
    switch (type) {
      case EContacts.Phone:
        updatedArray = [...phone];
        break;
      case EContacts.WhatsApp:
        updatedArray = [...whatsapp];
        break;
      case EContacts.Instagram:
        updatedArray = [...instagram];
        break;
      case EContacts.Facebook:
        updatedArray = [...facebook];
        break;
      default:
        break;
    }
    if (contactIndex >= 0 && contactIndex < updatedArray.length) {
      updatedArray.splice(contactIndex, 1);
      switch (type) {
        case EContacts.Phone:
          setPhone(updatedArray);
          break;
        case EContacts.WhatsApp:
          setWhatsapp(updatedArray);
          break;
        case EContacts.Instagram:
          setInstagram(updatedArray);
          break;
        case EContacts.Facebook:
          setFacebook(updatedArray);
          break;
        default:
          break;
      }
    }
  };

  const renderContactSection = (type: EContacts, contactsArray: IContactItem[],emptyMessage: string , color:string, contactTitleLabel?: string , contactValueLabel?: string, contactValueType? : 'text' | 'number') => {
    contactValueLabel = contactValueLabel || 'Value';
    contactValueType = contactValueType || 'text';

    const handleNameChange = (index: number, newValue: string ) => {
      const updatedArray = [...contactsArray];
      updatedArray[index].name = newValue;
      switch (type) {
        case EContacts.Phone:
          setPhone(updatedArray);
          break;
        case EContacts.WhatsApp:
          setWhatsapp(updatedArray);
          break;
        case EContacts.Instagram:
          setInstagram(updatedArray);
          break;
        case EContacts.Facebook:
          setFacebook(updatedArray);
          break;
        default:
          break;
      }
    };
    const handleValueChange = (index: number, newValue: string ) => {
      const updatedArray = [...contactsArray];
      updatedArray[index].value = newValue;
      switch (type) {
        case EContacts.Phone:
          setPhone(updatedArray);
          break;
        case EContacts.WhatsApp:
          setWhatsapp(updatedArray);
          break;
        case EContacts.Instagram:
          setInstagram(updatedArray);
          break;
        case EContacts.Facebook:
          setFacebook(updatedArray);
          break;
        default:
          break;
      }
    };
    const hasEmptyContact = contactsArray.some(contact => !contact.name || !contact.value);
    return (
      <Col style={{  }}>
        <Row p={'1rem'}>
          <Text s='18' w={6}>{type}</Text>
        </Row>
        <Col p={'1rem 1.5rem'}>
          {
          contactsArray.length ?  contactsArray.map((val, index) => (
            <Col p='1rem' style={{ borderLeft: '1px solid ' + color, gap: '0.5rem' }}>
              <Row a='center' j='between'>
                <Text w={6} c={theme.neutralColor.textTertiary}>{`${type} ${index + 1}`}</Text>
                <Icon color={theme.brandColor.red} name={IconName.Delete} onClick={() => handleDeleteContact(type, index)} />
              </Row>
              <InputText tt='cap' label={contactTitleLabel || 'Name'} value={val.name} onChange={(v) => handleNameChange(index,v)} />
              {contactValueType === 'number' ? 
                <InputTelephone label={contactValueLabel || 'Value'} value={val.value} onChange={v => handleValueChange(index,v)}/>
                :
                <InputText label={contactValueLabel || 'Value'} value={`${val.value}`} onChange={v => handleValueChange(index,v)} />
                } 
            </Col>
          ))
        :<Text s="14" color={theme.neutralColor.textQuaternary} style={{ marginLeft: '24px' }}>{emptyMessage}</Text>}
          <Row p='1rem'>
            <Button variant='secondary' color={color} onClick={() => handleAddNewContact(type)} disabled={hasEmptyContact}>Add {type}</Button>
          </Row>
        </Col>
      </Col>
    );
  };
  const emptyPhoneMessage = 'No phone numbers added.';
  const emptyInstagramMessage = 'No instagram profiles added.';
  const emptyFacebookMessage = 'No facebook profiles added.';
  const emptyWhatsappMessage = 'No whatsapp numbers added.';
  const phoneColor = "#0762e1";
  const waColor = "#0ba544";
  const fbColor = "#1166d5";
  const igColor = "#ed1a60";

  return (
    <>
      <Row a='center' j='between' style={{ borderBottom: '1px solid ' + theme.neutralColor.border }} p={'1rem 1rem'}>
        <Text s='16' w={6} c={theme.neutralColor.text}>Edit Contacts</Text>
        <Icon height={1.2} width={1.2} name={IconName.Close} color='#bd1414' onClick={() => onClose()} />
      </Row>
        <Col style = {{overflow: 'scroll', gap:'1rem'}} p='2rem 1rem'>
          {renderContactSection(EContacts.Phone, phone, emptyPhoneMessage, phoneColor,'Name', 'Number', 'number')}
          {renderContactSection(EContacts.WhatsApp, whatsapp, emptyWhatsappMessage, waColor,'Name', 'Number', 'number')}
          {renderContactSection(EContacts.Instagram, instagram, emptyInstagramMessage, igColor,'Name', 'Profile ID')}
          {renderContactSection(EContacts.Facebook, facebook, emptyFacebookMessage, fbColor,'Name', 'Profile ID')}
        </Col>
      <Row j="center" a="center" style={{gap:'1rem'}} p={'2rem 1rem'}>
        <Button width="100%" type="button" onClick={handleClose} >Close</Button>
        <Button width="100%" onClick={ handleSave} disabled={isSaveDisabled}>Save</Button>
      </Row>
    </>
  );
}

export default ContactsEditor;
