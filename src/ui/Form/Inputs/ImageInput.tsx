import React, { ChangeEvent, useRef } from "react";
import styled from "styled-components";
import Icon, { IconName } from "ui/Icon";

interface ImageInputProps {
  onChange: (file: File | null) => void;
}

const HiddenInput = styled.input`
  display: none;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: transparent;
  width: fit-content;
`;

const ImageInput : React.FC<ImageInputProps> = ({ onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      onChange(file);
    } else {
      onChange(null);
    }
  };

  return (
    <>
      <Button onClick={handleButtonClick}>
        <Icon name={IconName.Notification} width={1} height={1} />
        Upload Image
      </Button>
      <HiddenInput
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </>
  );
};

export default ImageInput;
