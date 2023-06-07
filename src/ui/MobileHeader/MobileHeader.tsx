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
        <div><Icon name={IconName.Bars} width={1.5} height={1.5} onClick={toggleSideNav}/> </div>
        <div><Brand/></div>
        <div>
        <IconEmptyWrapper >
        <Icon name={IconName.Ellipsis} width={1.5} height={1.5} onClick={toggleSideNav}/>
        </IconEmptyWrapper>
        </div>
        
        
    </MobileHeaderWrapper>
    )
};

export default MobileHeader;

