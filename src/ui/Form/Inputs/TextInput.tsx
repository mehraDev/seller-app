import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { Label } from "./styles";

interface TextInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 6px;
  border: 1px solid #d3d3d3;;
  border-radius: 4px;
  &:focus {
    outline: none;
    border: 1px solid blue;;
  }
  &:active {
    outline: none;
    border: 1px solid blue;;
  }
`;

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  required
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <InputWrapper>
      {label && 
      <Label>
        {label}
        {required && '*'}
        </Label>}
      <Input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
    </InputWrapper>
  );
};

export default TextInput;
