import { useLocation} from 'react-router-dom'
// import {useState} from 'react'
// import {faAngleDoubleLeft, faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons'
// import {WithStyledComponentProps} from 'components/ui/withStyledComponent'

import styled from 'styled-components'

import SideNavIcon from './SideNavIcon'
// import Logo from 'components/ui/Logo/Logo'
// import NameLogo from 'components/ui/Logo/NameLogo'

import SideNavWrapper, {SideNavItemWrapper, SideNavListWrapper} from './styles'
import NameLogoSideNav from 'ui/Logo/LogoSideNav';
import { useState } from 'react';

import Icon from 'ui/Icon/Icon';
import { IconName } from 'ui/Icon/iconNames';

interface SideNavProps {
  list: { name: string; icon: string }[];
  activeFeature: string;
  setActiveFeature: (feature: string) => void;
}

const SideNav: React.FC<SideNavProps> = ({ list, activeFeature, setActiveFeature }) => {
  const location = useLocation()
  const [activeItem, setActiveItem] = useState<null | string>(null)
  const [isOpen, setIsOpen] = useState(true)

  // Find the menu item that matches the current URL path
  const activeMenuItem = list.find((item) =>
    location.pathname.startsWith(`/${item.name.toLowerCase()}`),
  )

  // Set the active item based on the active menu item
  if (activeMenuItem && activeItem !== activeMenuItem.name) {
    setActiveItem(activeMenuItem.name)
  }

  return (
    <SideNavWrapper isOpen={true} className="sidenav">
    <NameLogoSideNav hideName={false} />
      <SideNavListWrapper>
        {list.map((item) => (
          <SideNavItemWrapper
            key={item.name}
            onClick={() => setActiveFeature(item.name)}
            className={activeItem === item.name ? 'active' : ''}
            // isOpen={isOpen}
          >
            
            <SideNavIcon zoom={!isOpen} iconName={item.icon} />
            <SideNavLabel isOpen={true}>
              {item.name}
            </SideNavLabel>
          </SideNavItemWrapper>
        ))}
      </SideNavListWrapper>
      <ToggleButton onClick={() => setIsOpen(!isOpen)}>
        <Icon name={IconName.LeftArrow} color='white'/>
      </ToggleButton>
     </SideNavWrapper>
  )
}

const SideNavLabel = styled.span`
  padding-left: 1rem;
`

const ToggleButton = styled.button`
    padding: 0.5rem;
    position: absolute;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    background: none;
    bottom: 2rem;
    right: 1rem;

  &:hover {
    background-color: rgb(0, 122, 234);
    & > svg {
            opacity: 1;
        }
  }
  & > svg {
        opacity: 0.8;
    }
`

export default SideNav
