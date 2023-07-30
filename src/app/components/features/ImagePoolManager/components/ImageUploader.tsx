// ImageUploader.tsx
import React, { useState } from "react";
import { Text, Col, Grid, Row } from "ui/basic";
import Button from "ui/Button";
import { getExtension, removeExtension } from "../services";
import PreviewCard from "./PreviewCard";
import { ImageMetadata } from "firebaseServices/Storage/uploadImageToFirebase";
import { uploadPublicImagesArray } from "app/services/Images/pool/imageUtils";
import theme from "ui/Utils/Media/Theme/theme";
import { PanelHeader } from "ui/headers";
import Icon, { IconName } from "ui/Icon";
import { InputFile } from "ui/Form";
import { LoadingAnimation } from "ui/LoadingAnimation";


interface ImageUploaderProps {
  onUpload: (files: File[]) => void;
  path: string;
  onClose: () => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload, onClose, path }) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [uploading, setIsUploading] = useState<boolean>(false);
  const [uploadMessage, setUploadMessage] = useState<string>("");
  const [names, setNames] = useState<string[]>([]);

  const handleInputFile = (files: FileList | null) => {
    if (files) {
      const mergedFiles = selectedImages ? [...selectedImages, ...Array.from(files)] : Array.from(files);
      setSelectedImages(mergedFiles);
      const newNames = mergedFiles.map((image) => {
        const fileNameWithoutExtensioin = removeExtension(image.name);
        return fileNameWithoutExtensioin;
      });
      setNames(newNames);
    }
  };

  const handleUpdateName = (newName: string, index: number) => {
    setNames((prevNames) => {
      const updatedNames = [...prevNames];
      updatedNames[index] = newName;
      return updatedNames;
    });
  };

  const handleDeleteImage = (index: number) => {
    setSelectedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
    setNames((prevNames) => {
      const updatedNames = [...prevNames];
      updatedNames.splice(index, 1);
      return updatedNames;
    });
  };

  const handleUploadImages = async () => {
    if (names.some((name) => name.trim() === "")) {
      alert("Image name cannot be empty.");
      return;
    }

    setIsUploading(true);
    try {
      const namesWithExtension = names.map((name, index) => {
        const extension = getExtension(selectedImages[index].name);
        return `${name}.${extension}`;
      });

      // Call the uploadPublicImagesArray function only for public pool locations
      if (path.includes("/p")) {
        const metadata: ImageMetadata = {
          timestamp: Date.now(), // Add a timestamp for the image upload
        };
        await uploadPublicImagesArray(
          selectedImages.map((image, index) => ({
            image,
            imageName: namesWithExtension[index],
            metadata,
          })),
          path.split("/")[1] // Extract the shop name from the location
        );
      }
      setUploadMessage("Success");
    } catch (error) {
      console.log("Error Uploading Images: ", error);
      setUploadMessage("Images Upload Failed");
    } finally {
      setIsUploading(false);
      setSelectedImages([]); // Clear selected images after upload
      setNames([]); // Clear image names after upload
    }
  };

  const handleDownloadZip = () => {
    // Add download zip functionality here
  };

  const isUploadingInProgress = uploading || uploadMessage !== "";

  return (
    <Col style={{ background: theme.neutralColor.bgContainer }} h="100%" w="100%">
      <PanelHeader>
        <Text>Image Uploader</Text>
        <Icon name={IconName.Close} onClick={onClose} />
      </PanelHeader>
      <Row p="0.5rem 1rem" style={{ gap: "1rem" }} a="center" j="end">
        <Button size="small" onClick={handleDownloadZip}>
          Download Zip
        </Button>
        <InputFile multiple={true} accept=".jpg,.png,.gif" onFileChange={handleInputFile} />
        <Button size="small" onClick={handleUploadImages} disabled={isUploadingInProgress || names.some((name) => name.trim() === "")}>
          Save to Pool
        </Button>
      </Row>
      <Row p="0.5rem 1rem" j="between">
        <Text>Total Images: {selectedImages.length}</Text>
      </Row>
      {selectedImages.length > 0 && (
        <Grid columns={4} mc={[0.5]} style={{ backgroundColor: "#f8f8f8" }}>
          {selectedImages.map((image, index) => (
            <PreviewCard
              file={image}
              key={index}
              filename={names[index]}
              onNameUpdate={(newName) => handleUpdateName(newName, index)}
              onDelete={() => handleDeleteImage(index)}
              isEditing={names[index].trim() === ""}
            />
          ))}
        </Grid>
      )}
      {/* Show loading spinner during upload */}
      {isUploadingInProgress && <LoadingAnimation />}
      {/* Show upload message after upload completion */}
      {uploadMessage && <Text>{uploadMessage}</Text>}
    </Col>
  );
};

export default ImageUploader;
