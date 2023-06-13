import React, { ChangeEvent } from "react";
import styled, { css } from "styled-components";
import { InputWrapper, Label } from "./styles";
import { IInput } from "./interface";

interface IInputText extends IInput{
  value: string;
  onChange: (value:string) => void
}
const Input = styled.input<{ hasValue: boolean }>`
  color: ${({theme}) => theme.neutralColor.text};
  font-weight: 400;
  border-width: 1px;
  padding: 8px 8px;
  font-size: 1rem;
  
  border-color: ${({theme}) => theme.neutralColor.border};
  border-radius: 4px;
  border-style: solid;
  outline: none;
  transition: border-color 0.3s ease;
  &:focus  {
    border-color:${({theme}) => theme.brandColor.primary};
    outline: none;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  }
  &:focus  + label{
    border-color:${({theme}) => theme.brandColor.primary};
    outline: none;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  }
  &:focus + label {
    color: ${({ theme }) => theme.brandColor.primary};
  }
`;

const InputText: React.FC<IInputText> = ({
  label,
  value,
  onChange,
  placeholder,
  required,
  labelTop = true
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <InputWrapper top={labelTop}>
      {label && 
        <Label top={labelTop} >
        {label}
        {required && '*'}
        </Label>}
      <Input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        hasValue={value !== ""}
        required={required}
      />
    </InputWrapper>
  );
};

export default InputText;
