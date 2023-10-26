import { searchFolder } from "firebaseServices/Storage";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { LoadingAnimation } from "ui/LoadingAnimation";
import { Col, Grid, Img, Text } from "ui/basic";

export interface IImageFile{
    name: string;
    isPoolImage: boolean;
    file?: File | null
}

interface IImageSelector {
  name: string;
  sellerId: string;
  shop: string;
  onImageSelected: (imageFile: IImageFile) => void;
}

interface IPoolImage {
  name: string;
  url: string;
}

const ImageSelector: React.FC<IImageSelector> = ({
  name,
  shop,
  sellerId,
  onImageSelected,
}) => {
  const [publicImages, setPublicImages] = useState<IPoolImage[]>([]);
  const [localImage, ] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const MAX_RESULTS = 4;
  const poolPath = `s/${shop}/p`;

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const poolImagesResults = await searchFolder(poolPath, name, MAX_RESULTS);
        setPublicImages(poolImagesResults);
        setLoading(false);
      } catch (error) {
        setError("Error fetching images.");
        setLoading(false);
      }
    };

    if (name.trim() !== "") {
      fetchImages();
    }

  }, [name, poolPath, sellerId]);

  const handleImageSelect = (imageData : IImageFile) => {
    setSelectedImage(imageData.name);
    if(imageData.isPoolImage){
      onImageSelected(imageData)
    }
    else {
      onImageSelected({
        ...imageData,
        file: localImage
      })
    }
  };

  return (
      <Col p="0.5rem" a="center" style={{ gap: "1rem" }}>
        <Text>Image Suggestions</Text>
        {loading ? ( // Render the spinner while loading
          <LoadingAnimation />
        ) : error ? ( // Render the error message in red
          <ErrorMessage>{error}</ErrorMessage>
        ) : publicImages.length > 0 ? (
          <Grid columns={2} mc={[0.4]} p="1rem">
            {publicImages.map((image) => (
              <ImageItem
                key={image.name}
                isSelected={image.name === selectedImage}
                onClick={() => handleImageSelect({
                  name:image.name,
                  isPoolImage: true,
                })}
              >
                <Img src={image.url} alt={image.name} />
              </ImageItem>
            ))}
          </Grid>
        ) : (
          <Message>No images found for "{name}"</Message>
        )}
        <Text>or</Text>
       <Col>
        {/* <InputFile onFileChange={(e) => handleFileSelect(e[0])}/> */}
          {localImage && (
            <Col>
              <ImageItem
                isSelected={localImage.name === selectedImage}
                onClick={() => handleImageSelect({
                  name: localImage.name,
                  isPoolImage: false,
                })}
              >
                <Img src={URL.createObjectURL(localImage)} alt={localImage.name} />
              </ImageItem>
            </Col>
          )}
        </Col>
      </Col>
  );
};

const ErrorMessage = styled(Text)`
  color: red;
`;

const Message = styled(Text)`
  color: ${({ theme }) => theme.neutralColor.text};
`;

const ImageItem = styled.div<{ isSelected: boolean }>`
  border: 2px solid ${({ isSelected }) => (isSelected ? "blue" : "transparent")};
  border-radius: 6px;
  cursor: pointer;
  height: 10rem;

  img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
`;

export default ImageSelector;
