import React, { useState } from "react";
import InputImageButton from "ui/Form/Inputs/InputImage";
import ImageCropper from "../ImageCropper/ImageCropper";
import { Col, Row,Text } from "ui/basic";
import { useTheme } from "styled-components";
import Button from "ui/Button";
import { Drawer } from "ui/Drawer";
import { Crop } from "react-image-crop";

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
    const theme = useTheme();
    const cropperRef = React.useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string >('');
  const initialCrop:Crop ={
    x: 0,
    y: 0,
    height: 200,
    width: 200 * (aspectRatio ? aspectRatio : 1),
    unit: "px",
  }
  const [crop, setCrop] = useState<Crop>(initialCrop);

  const handleImageChange = (image: File | null) => {
    setSelectedImage("");
    if (image) {
      const imageUrl = URL.createObjectURL(image);
        setSelectedImage(imageUrl);
    }
  };
  const handleCancel = () =>{
    setSelectedImage('');
    setCrop(initialCrop);
  }
  const handleCrop = (croppedImage :Crop) => {
    setCrop(croppedImage)
  } 
  const handleSaveImage = () => {
    if (!selectedImage) return;
    
    const img = new Image();
    const cropperElement = cropperRef.current;
    if (cropperElement) {
      const {width: containerWidth,height: containerHeight} = cropperElement.getBoundingClientRect();
      img.src = selectedImage;
      img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
        
      
      if (!crop.width || !crop.height) return;
 
      const scaleX = img.width / containerWidth;
      const scaleY = img.height / containerHeight;
      
      const sourceX = scaleX * (crop.x || 0);
      const sourceY = scaleY * (crop.y || 0);
      const sourceWidth = scaleX * crop.width;
      const sourceHeight = scaleY * crop.height;
      
      canvas.width = sourceWidth;
      canvas.height = sourceHeight;
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      ctx!.fillStyle = 'rgba(0, 0, 0, 0)';
      ctx!.fillRect(0, 0, canvas.width, canvas.height);
      ctx?.drawImage(
        img, 
        sourceX, 
        sourceY, 
        sourceWidth,
        sourceHeight,0,0,sourceWidth,sourceHeight
      );
      const croppedImageUrl = canvas.toDataURL("image/png");
      onUpload(croppedImageUrl);
      setSelectedImage("");
    };
    }
    
};

  const renderButton = () => {
    return <InputImageButton variant="secondary" onChange={handleImageChange} >
            {children}
            </InputImageButton>
      ;
  };
  return (
    <>
    <Drawer isOpen={selectedImage !== ''} h="100%">
            <Col h="100%" a="center" style={{background:theme.neutralColor.text}}>
              <Row p='1rem'  a="center" j="center" style={{background:'#000'}}>
               <Row a="center" j="center">
                <Text s="18" w={6} c={'#fff'}>
                  Preview
                  </Text>
               </Row>
              </Row>
              <Col h="100%" j="center" style={{background:theme.neutralColor.bgLayout}}>
              <Row  ref={cropperRef}>
                <ImageCropper
                  crop={crop}
                  onCrop={handleCrop}
                  aspectRatio={aspectRatio}
                  image={selectedImage}
                />
              </Row>
              </Col>
              <Row p='1rem'  a="center" j="center" style={{background:'#000',gap:'1rem'}}>
                <Button type="button" width="100%" onClick={handleCancel}>Cancel</Button>
                <Button type="button" width="100%"  onClick={handleSaveImage}>Done</Button>
              </Row> 
            </Col>
        </Drawer>
        {!selectedImage && renderButton()}
    </>
  );
};

export default ImageUploadWithPreview;
