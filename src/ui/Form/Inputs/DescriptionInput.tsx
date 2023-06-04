import React, { ChangeEvent } from "react";
import styled from "styled-components";

interface DescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

const Label = styled.label`
  margin-bottom: 0.5rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const DescriptionInput: React.FC<DescriptionInputProps> = ({
  value,
  onChange,
  label,
  placeholder,
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <>
      {label && <Label>{label}</Label>}
      <TextArea
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
    </>
  );
};

export default DescriptionInput;
