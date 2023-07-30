import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FolderViewer from "./FolderViewer";
import Icon, { IconName } from "ui/Icon";
import { listAll, ref } from "firebase/storage";
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
  // const [, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [subFoldersList, setSubFoldersList] = useState<string[]>([]);
  const [files, setFilesList] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [sellersID, setSellersID] = useState<{ [sellerID: string]: string }>({});
  const activePath = path[path.length -1];
  const completePath = path.join('/');
  console.log(path)
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
        const files = filesMetaData.map(file => file.name)
        setFilesList(files);
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
    // setSelectedImage(null);
  };
  const handleFileClick = (folderName:string) => {
    // setSelectedImage(null);
    updatePath([...path,folderName]); // Update the current path
  };
  const isShopPoolPath = path.length === 3 && path[0] === "s" && path[2] === "p";
  return (
    <Col>
      <Row p='0.5rem 1rem' a="center" >
        <Box>
        <Icon name={IconName.GoBack}  onClick={handleGoBack} />
        <BreadCrumbs  paths={path}  activePath={path[path.length - 1]} onClick={handlePathChange}/>
        </Box>
        {isShopPoolPath && ( // Render the "Add File" button only for valid shop pool paths
          <Box w="initial" m="0 5rem">
            <Button onClick={() => onUpload()}>Add File</Button>
          </Box>
        )}
      </Row>
      <Row>
      <FolderViewer foldersList={subFoldersList} onFolderClick={(name) => handleFolderClick(name)} isLoading={loading} filesList={files} hasError={error} onFileClick={(name) => handleFileClick(name)}/>
      </Row>
    </Col>
  );
};

const ImageList = styled.div`
  /* Styles for the list of images */
`;

const PreviewPane = styled.div`
  /* Styles for the image preview pane */
`;

const SearchBar = styled.div`
  /* Styles for the search bar */
`;


export default FileExplorer;
