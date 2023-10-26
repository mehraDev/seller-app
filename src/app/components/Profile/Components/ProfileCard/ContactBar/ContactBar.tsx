import React, { useState } from "react";
import Icon, { IconName } from "ui/Icon";
import ContactPopup, { IContactButtonOverlay } from "../ContactPopup/ContactPopup";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { Col } from "ui/basic";

interface IContactCard {
}

const ContactBar: React.FC<IContactCard> = () => {
  const { list: contacts, isLoading, error } = useSelector((state: RootState) => state.contacts);

  const [activeOverlay, setActiveOverlay] = useState<
    | IconName.Phone
    | IconName.Whatsapp
    | IconName.Facebook
    | IconName.Instagram
    | ""
  >("");

  if (isLoading || error || !contacts) {
    return null;
  }
  const { ph:phone, wa, fb, insta } = contacts;

  const phoneColor = "#0762e1";
  const waColor = "#0ba544";
  const fbColor = "#1166d5";
  const igColor = "#ed1a60";

  const handleContactClick = (index: number) => {
    if (activeOverlay === IconName.Phone) {
      window.location.href = `tel:${phone[index].value}`;
    } else if (activeOverlay === IconName.Whatsapp) {
      const whatsappNumber = wa[index].value;
      window.location.href = `https://wa.me/${whatsappNumber}`;
    } else if (activeOverlay === IconName.Facebook) {
      const facebookUsername = fb[index].value;
      window.open(`https://www.facebook.com/p/${facebookUsername}`, "_blank");
    } else if (activeOverlay === IconName.Instagram) {
      const instagramUsername = insta[index].value;
      window.open(`https://www.instagram.com/${instagramUsername}`, "_blank");
    }
    setActiveOverlay("");
  };

  const handleIconClick = (
    name:
      | IconName.Phone
      | IconName.Whatsapp
      | IconName.Facebook
      | IconName.Instagram
  ) => {
    setActiveOverlay(name);
  };

  let contactButtons: IContactButtonOverlay[] = [];
  if (activeOverlay === IconName.Phone) {
    contactButtons = phone.map((item) => ({
      contact: { name: item.name, value: item.value },
      color: phoneColor,
      iconName: IconName.Phone,
    }));
  } else if (activeOverlay === IconName.Whatsapp) {
    contactButtons = wa.map((item) => ({
      contact: { name: item.name, value: item.value },
      color: waColor,
      iconName: IconName.Whatsapp,
    }));
  } else if (activeOverlay === IconName.Facebook) {
    contactButtons = fb.map((item) => ({
      contact: { name: item.name, value: item.value },
      color: fbColor,
      iconName: IconName.Facebook,
    }));
  } else if (activeOverlay === IconName.Instagram) {
    contactButtons = insta.map((item) => ({
      contact: { name: item.name, value: item.value },
      color: igColor,
      iconName: IconName.Instagram,
    }));
  }

  return (
    <Col  w="initial" style={{ gap: "8px"}}>
      {phone.length !== 0 && (
        <Icon
          borderRadius={0.35}
          name={IconName.Phone}
          color={phoneColor}
          width={1.4}
          height={1.4}
          onClick={() => handleIconClick(IconName.Phone)}
        />
      )}
      {wa.length !== 0 && (
        <Icon
          borderRadius={0.35}
          name={IconName.Whatsapp}
          width={1.4}
          height={1.4}
          color={waColor}
          onClick={() => handleIconClick(IconName.Whatsapp)}
        />
      )}
      {insta.length !== 0 && (
        <Icon
          borderRadius={0.35}
          name={IconName.Instagram}
          width={1.4}
          height={1.4}
          color={igColor}
          onClick={() => handleIconClick(IconName.Instagram)}
        />
      )}
      {fb.length !== 0 && (
        <Icon
          borderRadius={0.35}
          name={IconName.Facebook}
          color={fbColor}
          width={1.4}
          height={1.4}
          padding="4px"
          onClick={() => handleIconClick(IconName.Facebook)}
        />
      )}
      {activeOverlay && (
        <ContactPopup
          onContact={handleContactClick}
          contactButtons={contactButtons}
          onClose={() => setActiveOverlay("")}
          name={activeOverlay}
        />
      )}
    </Col>
  );
};

export default ContactBar;
