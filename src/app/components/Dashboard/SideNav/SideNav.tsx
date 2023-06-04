
import SideNavWrapper, {AccountWrapper, SettingButton, SettingPopupWrapepr, SideNavAccountLabel, SideNavItemWrapper, SideNavLabel, SideNavListWrapper, ToggleButton} from './styles';

import { useState } from 'react';
import Icon, { IconName, IconSidenav } from 'ui/Icon';
import { IconEnum } from 'ui/Icon/IconSidenav';
import { auth } from 'firebaseServices/firebase';
import LogoSideNav from 'ui/Logo';

interface SideNavProps {
  list: { name: string; icon: keyof typeof IconEnum }[];
  activeFeature: number;
  setActiveFeature: (feature: number) => void;
  show: boolean;
  toggleSideNav: (flag: boolean) => void;
};

const SideNav: React.FC<SideNavProps> = ({ list, activeFeature, setActiveFeature ,show,toggleSideNav}) => {
  const [activeItem, setActiveItem] = useState<number>(activeFeature);
  const [accountPopup, setAccountPopup] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(true);
  const itemClickHandler = (activeItem:number) => {
    setActiveFeature(activeItem);
    setActiveItem(activeItem);
    if(isOpen){
      toggleSideNav(false);
    }
  };
  const username = auth.currentUser;
  console.log(username)
  return (
    <SideNavWrapper show={show} className="sidenav" expanded={isOpen}>
      <LogoSideNav hideName={!isOpen} sizeLarge={2}/>
      <SideNavListWrapper expanded={isOpen}>
        {list.map((item,index) => (
          <SideNavItemWrapper
            key={item.name}
            onClick={() => itemClickHandler(index)}
            className={activeItem === index ? 'active' : ''}
            // isOpen={isOpen}
          >
            <IconSidenav zoom={!isOpen} iconName={item.icon} />
            <SideNavLabel show={isOpen}>
              {item.name}
            </SideNavLabel>
          </SideNavItemWrapper>
        ))}
      </SideNavListWrapper>
      <AccountWrapper expanded={isOpen}>
      <SideNavItemWrapper
            key={'account'}
            onClick={() => {}}
          >
            <IconSidenav zoom={!isOpen} iconName={'Account'} />
            <SideNavAccountLabel show={isOpen}>
            Panj Tara Dhaba
            </SideNavAccountLabel>
          </SideNavItemWrapper>
          <SettingButton>
            <Icon name={IconName.Setting} color='white' onClick={() => setAccountPopup(!accountPopup)}/>
           {accountPopup &&
            <SettingPopupWrapepr>
              <span >
                Logout
              </span>
              <Icon name={IconName.RightArrow} color='white'/>
            </SettingPopupWrapepr>}
            </SettingButton>
        </AccountWrapper>
      <ToggleButton onClick={() => setIsOpen(!isOpen)}>
        <Icon name={isOpen ? IconName.LeftArrow : IconName.RightArrow} color='white'/>
      </ToggleButton>
     </SideNavWrapper>
  )
};

export default SideNav
