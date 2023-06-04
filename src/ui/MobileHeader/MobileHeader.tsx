import Brand from 'app/components/Brand';
import React from 'react';


import MobileHeaderWrapper, { IconEmptyWrapper } from './styles';
import Icon, { IconName } from 'ui/Icon';

interface Props {
    toggleSideNav: () => void;
}

const MobileHeader: React.FC<Props> = ({toggleSideNav}) => {
  return (
    <MobileHeaderWrapper>
        <Icon name={IconName.Bars} width={1.5} height={1.5} onClick={toggleSideNav}/> 
        <Brand/>
        {/* <IconEmptyWrapper >
        <Icon name={IconName.Bars} width={1.5} height={1.5} onClick={toggleSideNav}/>
        </IconEmptyWrapper> */}
        
    </MobileHeaderWrapper>
    )
};

export default MobileHeader;

