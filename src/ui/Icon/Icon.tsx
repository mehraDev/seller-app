import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties, useEffect, useState } from "react";
import { 

  faCheck,
  faRotateLeft,
  faEyeSlash,
  faEye,
  faPlus,
  faQrcode,
  faTrashRestore,
  faImage,faChevronLeft,faRing,faCircleExclamation,faGear,faHouse,faXmark,faBell, faArrowLeft, faArrowRight,faBars,faEllipsisVertical,faChevronDown,faChevronUp, faEdit, faTrash, faLocation, faLeaf, faDiamond, faPhone,
  faXmarkCircle,
  faTimes,
  faSearch,
  faSortDown,
  faCrop
} from '@fortawesome/free-solid-svg-icons';

  import styled from "styled-components";
import {
  faFacebook,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

export enum IconName {
  Crop='crop',
  Check = 'check',
  Clear = "clear",
  Diamond = "diamond",
  DownArrow = 'downArrow',
  Facebook = "facebook",
  Instagram = "instagram",
  Notification = 'notification',
  Leaf = "leaf",
  LeftArrow = 'leftArrow',
  Location = "location",
  RightArrow = 'rightArrow',
  Bars = 'bars',
  Ellipsis = 'ellipsis',
  ChevronDown = 'chevronDown',
  ChevronUp = 'chevronUp',
  Close = 'faXmark',
  Home = 'home',
  Setting = 'setting',
  Alert = 'alert',
  VegNonveg = 'vegNonveg',
  GoBack = 'goBack',
  Image = 'image',
  Edit ='edit',
  Delete = 'delete',
  PassHide = 'passwordhide',
  PassShow = 'passwordshow',
  Plus = 'plus',
  Phone = "phone",
  Qr = 'qr',
  Recover = 'recover',
  Search = "search",
  Undo = 'undo',
  Whatsapp = "whatsapp",
  Xmark = 'xmark'
}

interface Icons {
  [name: string]: any;
}

export const icons: Icons = {
  crop : faCrop,
  check: faCheck,
  clear: faTimes,
  diamond: faDiamond,
  downArrow: faSortDown,
  facebook: faFacebook,
  instagram: faInstagram,
  notification: faBell,
  leaf: faLeaf,
  leftArrow: faArrowLeft,
  location: faLocation,
  rightArrow: faArrowRight,
  bars: faBars,
  ellipsis: faEllipsisVertical,
  chevronDown: faChevronDown,
  chevronUp: faChevronUp,
  faXmark: faXmark,
  home: faHouse,
  setting: faGear,
  alert: faCircleExclamation,
  vegNonveg: faRing,
  goBack: faChevronLeft,
  image: faImage,
  edit: faEdit,
  delete: faTrash,
  passwordshow: faEye,
  passwordhide: faEyeSlash,
  plus : faPlus,
  phone: faPhone,
  qr : faQrcode,
  search: faSearch,
  undo: faRotateLeft,
  recover:faTrashRestore,
  whatsapp: faWhatsapp,
  xmark:faXmarkCircle
};


interface IconProps {
  name: IconName;
  className?: string;
  color?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  onBlur? : () => void;
  onClick? : () => void,
  isHoverable? : boolean,
  clickEffectTime? : number,
  padding?: string;
  style?: CSSProperties;
  br? : string
}

const Icon: React.FC<IconProps> = ({
  name,
  br,
  className,
  color,
  width ,
  height ,
  borderRadius = 0.25,
  isHoverable = true,
  clickEffectTime = 100,
  onBlur,
  onClick,
  padding,
  style
}) => {
  const [, setIsHovered] = useState(false);
  const icon = icons[name];
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (isClicked) {
      const timeout = setTimeout(() => {
        setIsClicked(false);
      }, clickEffectTime);

      return () => clearTimeout(timeout);
    }
  }, [clickEffectTime, isClicked]);
  
  const handleClick = () => {
    setIsClicked(true);
    if (onClick) {
      onClick();
    }
  };

  const iconStyle: CSSProperties = {
    color,
    width: width ? `${width}rem` : '',
    height:  height ? `${height}rem`: '',
    borderRadius: `${br ? br :  borderRadius + 'rem'}`,
    cursor: isHoverable ? 'pointer' : 'default',
    background: (isClicked && clickEffectTime) ? '#04000008' : '',
    padding: padding ? padding : "4px",
    ...style,
  };
  return (
<IconWrapper >
<FontAwesomeIcon
      onBlur={onBlur}
      icon={icon}
      className={className}
      style={{ ...iconStyle}}
      onClick={() => handleClick()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
</IconWrapper>
   

    
  );
};

const IconWrapper = styled.div`
`;
export default Icon;
