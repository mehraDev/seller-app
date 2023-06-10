import React, { useState } from 'react';
import styled from 'styled-components';
import Icon, { IconName } from 'ui/Icon';

interface OptionsProps {
  onClick?: () => void;
  children: React.ReactNode; 
}

const OptionsWrapper = styled.div`
    right: 8px;
    top: -3rem;
    z-index: 200;
    position: absolute;
`;
const OptionsList = styled.div`
    
`;

const Options: React.FC<OptionsProps> = ({ onClick,children }) => {
    const [optionsEnable, setDashboardHeight] = useState();
  return (
    <OptionsWrapper>
      <Icon name={IconName.Ellipsis} width={1.5} height={1.5} onClick={onClick} />
      <OptionsList>{children}</OptionsList>
    </OptionsWrapper>
  );
};

export default Options;
