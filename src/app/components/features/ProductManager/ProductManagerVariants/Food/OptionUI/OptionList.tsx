import React, { useState } from 'react';
import styled from 'styled-components';
import Icon, { IconName } from 'ui/Icon';

interface OptionsListProps {
}

const OptionsWrapper = styled.div`
  display: flex;
  position: absolute;
  background-color: white;
  width: 15rem;
  
  padding: 1rem 0.5rem;
  border-radius: 8px;
  box-shadow: ${({theme})=> theme.shadow.boxShadowSecondary};
    right: 16px;
    top: 2.5rem;
  flex-direction: ${({ viewMode }: OptionsListProps) => (viewMode === 'tile' ? 'row' : 'column')};
`;

const OptionItem = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  margin-right: 10px;
`;

const OptionsList: React.FC<OptionsListProps> = ({  }) => {
  const [options] = useState(['Category Management', 'Select', 'Edit']);

  return (
    <OptionsWrapper >
      {options.map((option) => (
        <OptionItem key={option} >
          <IconWrapper>
            {/* Render the icon based on the option */}
            {option === 'Category Management' && <Icon name={IconName.Home} />}
            {option === 'Select' && <Icon name={IconName.Home} />}
            {option === 'Edit' && <Icon name={IconName.Home} />}
          </IconWrapper>
          <div>{option}</div>
        </OptionItem>
      ))}
    </OptionsWrapper>
  );
};

export default OptionsList;
