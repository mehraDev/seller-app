// ImageCropperComponent.tsx
import React, { useState } from "react";
import { Col, Row, Text } from "ui/basic";
import Button from "ui/Button";
import { Crop } from "react-image-crop";
import ImageCrop from "./ImageCrop";
import { useTheme } from "styled-components";

interface ImageCropperComponentProps {
  selectedImage: string;
  onCancel: () => void;
  onSave: (croppedImage: string) => void;
  aspectRatio: number;
}

const ImageCropperComponent: React.FC<ImageCropperComponentProps> = ({
  selectedImage,
  onCancel,
  onSave,
  aspectRatio,
}) => {
    const theme = useTheme();
  const cropperRef = React.useRef<HTMLDivElement>(null);
  const initialCrop:Crop ={
    x: 0,
    y: 0,
    height: 200,
    width: 200 * (aspectRatio ? aspectRatio : 1),
    unit: "px",
  }
  const [crop, setCrop] = useState<Crop>(initialCrop);
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
      onSave(croppedImageUrl);

    };
    }
    
};
  return (
    <Col h="100%" a="center" style={{background: theme.neutralColor.text}}>
      <Row p='1rem'  a="center" j="center" style={{background: theme.neutralColor.bgContainer}}>
        <Text s="18" w={6} c={theme.neutralColor.text}>
          Crop your image
        </Text>
      </Row>
      <Col h="100%" j="center" style={{background: theme.neutralColor.bgLayout}}>
        <Row ref={cropperRef}>
          <ImageCrop
            crop={crop}
            onCrop={handleCrop}
            aspectRatio={aspectRatio}
            image={selectedImage}
          />
        </Row>
      </Col>
      <Row p='1rem' a="center" j="center" style={{background: theme.neutralColor.bgContainer, gap: '1rem'}}>
        <Button type="button" width="100%" onClick={onCancel}>Cancel</Button>
        <Button type="button" width="100%" onClick={handleSaveImage}>Save</Button>
      </Row>
    </Col>
  );
};

export default ImageCropperComponent;
