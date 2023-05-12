import { IconName, icons } from "./iconNames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties, useState } from "react";

interface IconProps {
  name: IconName;
  className?: string;
  color?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
}

const Icon: React.FC<IconProps> = ({
  name,
  className,
  color,
  width = 1,
  height = 1,
  borderRadius = 0.5,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const icon = icons[name];

  const iconStyle: CSSProperties = {
    color,
    width: `${width}rem`,
    height: `${height}rem`,
    borderRadius: `${borderRadius}rem`,
  };

  return (
    <FontAwesomeIcon
      icon={icon}
      className={className}
      style={{ ...iconStyle}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};

export default Icon;
