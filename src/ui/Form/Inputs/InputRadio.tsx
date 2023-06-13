import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { InputWrapper, Label } from "./styles";
import { IInput } from "./interface";

interface IInputRadio extends IInput {
    label?: string
    options: { label: string; value: any }[];
  onChange: (value: any) => void;
}

const RadioButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 12px;
`;

const RadioButtonOption = styled.label`
  display: inline-flex;
  align-items: center;
  margin-right: 1rem;
`;

const RadioButtonInput = styled.input`
    margin-right: 0.5rem;
`;

const RadioButtonIcon = styled.span<{ checked: boolean }>`
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: ${({ checked }) => (checked ? "0" : "50%")};
  background-color: ${({ checked }) => (checked ? "green" : "red")};
  border: 1px solid #000;
  margin-right: 4px;
`;

const InputRadio: React.FC<IInputRadio> = ({
  label,
  options,
  value,
  onChange,
  labelTop = true,
  required = false
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedOption = event.target.value;
    onChange(selectedOption);
  };

  return (
    <InputWrapper top={labelTop}>
      {label && 
        <Label top={labelTop}>
        {label}
        {required && '*'}
        </Label>}
      <RadioButtonWrapper>
        {options.map((option) => (
          <RadioButtonOption key={option.value}>
            <RadioButtonInput
              type="radio"
              name={label}
              value={option.value}
              checked={value === option.value}
              onChange={handleInputChange}
            />
            {/* <RadioButtonIcon checked={value === option.value} /> */}
            <>{option.label}</>
          </RadioButtonOption>
        ))}
      </RadioButtonWrapper>
    </InputWrapper>
  );
};

export default InputRadio;
