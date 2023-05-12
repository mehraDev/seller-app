import { IconEnum, iconMap } from 'app/services/DashboardPage/SideNav/getSideNavIcons';
import { Suspense, FC } from 'react';


interface SideNavIconProps {
  iconName: keyof typeof IconEnum;
  fill?: string;
  zoom?: boolean;
  [key: string]: any;
}

const SideNavIcon: FC<SideNavIconProps> = ({ iconName, fill = 'white', zoom, ...props }) => {
  const IconComponent = iconName ? iconMap[iconName] : null;
  const size = zoom ? '1.5rem' : '1rem';
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {IconComponent && (
        <svg viewBox="0 0 512 512" style={{ height: size, width: size, fill: fill }} {...props}>
          <IconComponent />
        </svg>
      )}
    </Suspense>
  );
};

export default SideNavIcon;
