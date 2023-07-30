import { searchFolder } from "firebaseServices/Storage";
import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import Button from "ui/Button";
import { LoadingAnimation } from "ui/LoadingAnimation";
import { Col, Grid, Img, Text } from "ui/basic";

interface IImageSelector {
  name: string;
  sellerId: string;
  onImageSelected: (imageUrl: string) => void;
}

interface IImage {
  name: string;
  url: string;
}

const ImageSelector: React.FC<IImageSelector> = ({
  name,
  sellerId,
  onImageSelected,
}) => {
  const theme = useTheme();
  const [publicImages, setPublicImages] = useState<IImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const MAX_RESULTS = 4;

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true); // Show the spinner while loading
      setError(null); // Clear any previous errors
      try {
        const poolPath = `s/food/p`;
        const poolImagesResults = await searchFolder(poolPath, name, MAX_RESULTS);
        console.log(poolImagesResults)
        setPublicImages(poolImagesResults);
        setLoading(false); // Hide the spinner after fetching data
      } catch (error) {
        setError("Error fetching images. Please try again later.");
        setLoading(false); // Hide the spinner if there's an error
      }
    };

    if (name.trim() !== "") {
      fetchImages();
    } else {
      // Show an error message if the name is empty
      setError("Please enter a product name.");
      setPublicImages([]);
    }
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
    <>
      <Text c={theme.neutralColor.text}>Select Image</Text>
      <Col p="0.5rem" a="center" style={{ gap: "1rem" }}>
        <Text>Image Suggestions</Text>
        {loading ? ( // Render the spinner while loading
          <LoadingAnimation />
        ) : error ? ( // Render the error message in red
          <ErrorMessage>{error}</ErrorMessage>
        ) : publicImages.length > 0 ? ( // Check if there are images found
          <Grid columns={2} mc={[0.4]} p="1rem">
            {publicImages.map((image) => (
              <ImageItem
                key={image.url}
                isSelected={image.url === selectedImage}
                onClick={() => handleImageClick(image.url)}
              >
                <Img src={image.url} alt={image.name} />
              </ImageItem>
            ))}
          </Grid>
        ) : (
          // Show a message if no images are found
          <Message>No images found for "{name}"</Message>
        )}
        <Text>OR</Text>
        <Button onClick={(e) => e.preventDefault()}>Upload</Button>
      </Col>
    </>
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
