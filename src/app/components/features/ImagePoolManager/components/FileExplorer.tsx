import React, { useEffect, useState } from "react";
import ImageGallery, { IImage } from "./ImageGallery";
import Icon, { IconName } from "ui/Icon";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "firebaseServices/firebase";
import { Box, Col, Row } from "ui/basic";
import { BreadCrumbs } from "ui/BreadCrumbs";
import fetchUserNames from "../services/fetchUserNames";
import Button from "ui/Button";

interface IFileExplorer {
  path: string[],
  onUpload: () => void,
  updatePath: (newPath: string[]) => void 
}

const FileExplorer: React.FC<IFileExplorer> = ({path,onUpload,updatePath}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [subFoldersList, setSubFoldersList] = useState<string[]>([]);
  const [images, setImages] = useState<IImage[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [sellersID, setSellersID] = useState<{ [sellerID: string]: string }>({});
  const activePath = path[path.length -1];
  const completePath = path.join('/');

  useEffect(() => {
    const fetchFolderContents = async () => {
      try {
        setLoading(true);
        setError(false);
        const folderRef = ref(storage, completePath);
        const folderData = await listAll(folderRef);
        const subFoldersMetaData = folderData.prefixes;
        const foldersList = subFoldersMetaData.map(prefix => prefix.name);

        if (activePath === "usr") {
          const userNames = await fetchUserNames(foldersList);
          const sellersMap: { [sellerID: string]: string } = {};
          foldersList.forEach((sellerID, index) => {
            sellersMap[userNames[index]] = sellerID;
          });
          setSubFoldersList(userNames);
          setSellersID(sellersMap);
        } else {
          setSubFoldersList(foldersList);
        }

        const filesMetaData = folderData.items;
        const imageFiles = await Promise.all(
          filesMetaData.map(async (file) => {
            const imageUrl = await getDownloadURL(file);
            return { name: file.name, imageUrl };
          })
        );
        setImages(imageFiles);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchFolderContents();
  }, [activePath, completePath]);
  
  const handlePathChange = (index: number) => {
    const newPath = path.slice(0, index + 1);
    updatePath(newPath);
  };
  const handleGoBack = () => {
    if (path.length === 1) {
      return;
    }
    const newPath = path.slice(0, -1);
    updatePath(newPath);
  };
  const handleFolderClick = (folderName:string) => {
    if(activePath === 'usr'){
      const sellerID = sellersID[folderName];
      updatePath([...path, sellerID]);
    }
    else{
      updatePath([...path,folderName]);
    }
  };
  const handleFileClick = (folderName:string) => {
    updatePath([...path,folderName]);
  };
  const isShopPoolPath = path.length === 3 && path[0] === "s" && path[2] === "p";
  return (
    <Col>
      <Row p='0.5rem 1rem' a="center"  j="between">
        <Box  w="initial">
          <Icon name={IconName.GoBack}  onClick={handleGoBack} />
          <BreadCrumbs  paths={path}  activePath={path[path.length - 1]} onClick={handlePathChange}/>
        </Box>
        {isShopPoolPath && (
          <Box w="initial">
            <Button onClick={() => onUpload()}>{'Add File'}</Button>
          </Box>
        )}
      </Row>
      <Row>
        <ImageGallery foldersList={subFoldersList} onFolderClick={(name) => handleFolderClick(name)} isLoading={loading} images={images} hasError={error} onFileClick={(name) => handleFileClick(name)}/>
      </Row>
    </Col>
  );
};

export default FileExplorer;
