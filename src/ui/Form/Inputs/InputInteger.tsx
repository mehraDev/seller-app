import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { InputWrapper, Label } from "./styles";
import { IInput } from "./interface";

interface IInputInteger extends IInput{
  value: number | string;
  onChange: (value:number) => void;
  width? : string
}

const Input = styled.input`
  color: ${({theme}) => theme.neutralColor.text};
  font-weight: 400;
  border-width : 1px;
  padding: 12px;
  font-size: 1rem;
  border-color: ${({theme}) => theme.neutralColor.border};
  transition: border-color 0.3s ease;
  width: ${({width}) => width ? width : ''} ;
  border-radius: 4px;
  border-style: solid;
  &:focus {
    border-color:${({theme}) => theme.brandColor.primary};
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    outline: none;
  }
  &:active {
    outline: none;
    border-color: ${({theme}) => theme.brandColor.primary};
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }

`;

const InputInteger: React.FC<IInputInteger> = ({
  label,
  value,
  onChange,
  required,
  labelTop = true,
  width
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(event.target.value);
    if (!isNaN(inputValue) && (!required || inputValue >= 0)) {
      onChange(inputValue);
    }
  };

  return (
    <InputWrapper top={labelTop}>
      {label && 
        <Label top={labelTop}>
        {label}
        {required && '*'}
        </Label>}
      <Input
        type="number"
        value={value}
        onChange={handleInputChange}
        required={required}
        placeholder="0"
        width={width}
      />
    </InputWrapper>
  );
};

export default InputInteger;
