import React, { useState } from "react";
import InputImageButton from "ui/Form/Inputs/InputImage";
import { Drawer } from "ui/Drawer";
import ImageCropper from "../ImageCropper/ImageCropper";

interface IImageUploadWithPreview {
  onUpload: (croppedImage: string) => void;
  aspectRatio ?: number;
  children?: React.ReactNode; 
}

const ImageUploadWithPreview: React.FC<IImageUploadWithPreview> = ({
  onUpload,
  aspectRatio,
  children
}) => {
  const [selectedImage, setSelectedImage] = useState<string >('');

  const handleImageChange = (image: File | null) => {
    setSelectedImage("");
    if (image) {
      const imageUrl = URL.createObjectURL(image);
        setSelectedImage(imageUrl);
    }
  };
  const handleCancel = () =>{
    setSelectedImage('');
  }

  const renderButton = () => {
    return <InputImageButton  variant="secondary" onChange={handleImageChange} >
            {children}
            </InputImageButton>
      ;
  };
  return (
    <>
      <Drawer isOpen={selectedImage !== ''} h="100%">
        <ImageCropper
          selectedImage={selectedImage}
          onCancel={handleCancel}
          onSave={onUpload}
          aspectRatio={aspectRatio? aspectRatio : 1}
        />
      </Drawer>
      {!selectedImage && renderButton()}
    </>
  );
};

export default ImageUploadWithPreview;
