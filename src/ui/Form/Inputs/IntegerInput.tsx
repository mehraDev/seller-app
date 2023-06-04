import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { FlexBox, Label } from "./styles";

interface IntegerInputProps {
  value: number;
  label?: string;
  onChange: (value: number) => void;
  required?: boolean;
}

// const InputWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 1rem;
// `;

const Input = styled.input`
  padding: 6px;
  width: 100px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;


const IntegerInput: React.FC<IntegerInputProps> = ({
  label,
  value,
  onChange,
  required,
}) => {
  const [localValue, setLocalValue] = useState(value);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(event.target.value);
    if (!isNaN(inputValue) && (!required || inputValue >= 0)) {
      setLocalValue(inputValue);
      onChange(inputValue);
    }
  };

  return (
    <FlexBox>
      <Label>
        {label}
        {required && '*'}</Label>
      <Input
        type="number"
        value={localValue.toString()}
        onChange={handleInputChange}
        required={required}
      />
    </FlexBox>
  );
};

export default IntegerInput;
