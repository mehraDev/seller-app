import React from "react";
import styled from "styled-components";

interface ImageViewerProps {
  images: string[];
}

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const NoImagesText = styled.p`
  text-align: center;
  font-size: 16px;
  color: #888;
`;

const ImageViewer: React.FC<ImageViewerProps> = ({ images }) => {
  if (images.length === 0) {
    return <NoImagesText>No images found.</NoImagesText>;
  }

  return (
    <ImageGrid>
      {images.map((src, index) => (
        <Image key={index} src={src} alt={`Image ${index}`} />
      ))}
    </ImageGrid>
  );
};

export default ImageViewer;
