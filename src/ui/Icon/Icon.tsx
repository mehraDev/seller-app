import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties, useState } from "react";
import { faRing,faCircleExclamation,faGear,faHouse,faXmark,faBell, faArrowLeft, faArrowRight,faBars,faEllipsisVertical,faChevronDown,faChevronUp } from '@fortawesome/free-solid-svg-icons';


export enum IconName {
  Notification = 'notification',
  LeftArrow = 'leftArrow',
  RightArrow = 'rightArrow',
  Bars = 'bars',
  Ellipsis = 'ellipsis',
  ChevronDown = 'chevronDown',
  ChevronUp = 'chevronUp',
  Close = 'faXmark',
  Home = 'home',
  Setting = 'setting',
  Alert = 'alert',
  VegNonveg = 'vegNonveg'
}

interface Icons {
  [name: string]: any;
}

export const icons: Icons = {
  notification: faBell,
  leftArrow: faArrowLeft,
  rightArrow: faArrowRight,
  bars: faBars,
  ellipsis: faEllipsisVertical,
  chevronDown: faChevronDown,
  chevronUp: faChevronUp,
  faXmark: faXmark,
  home: faHouse,
  setting: faGear,
  alert: faCircleExclamation,
  vegNonveg: faRing
};


interface IconProps {
  name: IconName;
  className?: string;
  color?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  onClick? : () => void,
  isHoverable? : boolean
}

const Icon: React.FC<IconProps> = ({
  name,
  className,
  color,
  width = 1,
  height = 1,
  borderRadius = 0.5,
  isHoverable = true,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const icon = icons[name];

  const iconStyle: CSSProperties = {
    color,
    width: `${width}rem`,
    height: `${height}rem`,
    borderRadius: `${borderRadius}rem`,
    cursor: isHoverable ? 'pointer' : 'default'
  };

  return (
    <FontAwesomeIcon
      icon={icon}
      className={className}
      style={{ ...iconStyle}}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};

export default Icon;
