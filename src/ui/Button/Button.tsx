import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import theme from 'ui/Utils/Media/Theme/theme';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  width?: string;
  padding?: string;
  margin?: string;
  color? : string;
  bg? : string;
  border? : string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size ,
  color,
  bg,
  border,
  ...rest
}) => {

  return (
    <ButtonWrapper variant={variant} size={size} {...rest} color={color} bg={bg} border={border}>
      {children}
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.button<ButtonProps>`
  background-color: ${({bg , variant}) => 
    bg ? bg:   variant === 'primary' ? theme.brandColor.primary : 'transparent'};
  color: ${({color,variant}) => 
  (color ? color : variant === 'primary' ? '#ffffff' : '#007aff')};
  border: ${({color , border,variant}) =>
    (border ? color : variant === 'primary' ? '#ffffff' : '#007aff')};
  border-radius: 4px;
  padding: ${({padding}) => padding ? padding : '0.5rem 1rem'} ;
  ${(props) =>
    props.fullWidth &&
    `
    display: block;
    width: 100%;
  `}
  ${(props) =>
    props.width &&
    `
    width: ${props.width};
  `}
  ${(props) =>
    props.padding &&
    `
    padding: ${props.padding};
  `}
  ${(props) =>
    props.margin &&
    `
    margin: ${props.margin};
  `}
  font-size: ${(props) =>
    props.size === 'small'
      ? '0.8rem'
      : props.size === 'medium'
      ? '1rem'
      : ''};

  cursor: pointer;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.variant === 'primary' ?  theme.brandColor.primaryActive : '#007aff'};
    color: ${(props) => (props.variant === 'primary' ? '#ffffff' : '#ffffff')};
    border-color: ${(props) =>
      props.variant === 'primary' ? 'none' : '#0062cc'};
  }
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
`;

export default Button;
