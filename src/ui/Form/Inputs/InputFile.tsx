import React, { useRef } from "react";
import styled from "styled-components";
import Button from "ui/Button";

interface InputFileProps {
  accept?: string;
  multiple?: boolean;
  onFileChange: (files: FileList | null) => void;
}

const InputFile: React.FC<InputFileProps> = ({ accept, multiple, onFileChange }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    onFileChange(files);
  };

  return (
    <>
      <Button onClick={handleButtonClick}>Choose Files</Button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
      />
    </>
  );
};

export default InputFile;
