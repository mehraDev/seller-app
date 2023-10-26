import React from "react";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Img } from "ui/basic";

interface IImageCropperProps {
  image: string;
  crop: Crop;
  onCrop: (croppedImage: Crop) => void;
  aspectRatio? : number;
}

const ImageCropper: React.FC<IImageCropperProps> = ({
  aspectRatio = 1,
  crop,
  image,
  onCrop
}) => {
  const handleCropChange = (newCrop: Crop) => {
    onCrop(newCrop);
  };

  return (
        <ReactCrop
          crop={crop}
          style={{ width: '100%',backgroundColor: 'transparent'  }}
          onChange={handleCropChange}
          aspect={aspectRatio}
        >
            <Img src={image} alt="image"/>
            </ReactCrop>
  );
};

export default ImageCropper;
