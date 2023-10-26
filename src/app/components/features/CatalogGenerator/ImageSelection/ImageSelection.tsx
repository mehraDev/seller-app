import { searchFolder } from "firebaseServices/Storage";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Col, Row, Text } from "ui/basic";


interface ImageSelectionProps {
  name: string;
  sellerId: string;
  onImageSelected: (imageUrl: string) => void;
}

const ImageSelection: React.FC<ImageSelectionProps> = ({
  name,
  sellerId,
  onImageSelected,
}) => {
  const [pImages, setPImages] = useState<string[]>([]);
  const [usrImages, setUsrImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const poolPath = `s/food/p`;
        const poolImages  = await searchFolder(poolPath, name);
        const poolImageUrls = poolImages.map((fileData) => fileData.url);
        setPImages(poolImageUrls);
        const userPath = `s/food/usr/${sellerId}/p/`;
        const userImages = await searchFolder(userPath, name);
        setUsrImages(userImages.map(image => image.name));
        console.log(userImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [name, sellerId]);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleDoneClick = () => {
    if (selectedImage) {
      onImageSelected(selectedImage);
    }
  };

  return (
    <Col>
      <ImageGrid>
        {pImages.map((imageUrl,index) => (
          <ImageItem
            key={imageUrl}
            isSelected={imageUrl === selectedImage}
            onClick={() => handleImageClick(imageUrl)}
          >
            <img src={imageUrl} alt={name} />
            <Text >index</Text>
          </ImageItem>
        ))}
        {usrImages.map((imageUrl,index) => (
          <ImageItem
            key={imageUrl}
            isSelected={imageUrl === selectedImage}
            onClick={() => handleImageClick(imageUrl)}
          >
            <img src={imageUrl} alt={name} />
            <Text>index</Text>
          </ImageItem>
        ))}
      </ImageGrid>
      <Row >
        <Button onClick={handleDoneClick}>Done</Button>
        <Button onClick={() => setSelectedImage(null)}>Skip</Button>
      </Row>
    </Col>
  );
};


const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const ImageItem = styled.div<{ isSelected: boolean }>`
  border: 2px solid ${({ isSelected }) => (isSelected ? "blue" : "transparent")};
  border-radius: 6px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default ImageSelection;
