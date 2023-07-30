import { useState } from "react";
import FileExplorer from "./components/FileExplorer";
import ImageUploader from "./components/ImageUploader";
import { Box } from "ui/basic";
import { Backdrop } from "ui/Backdrop";

const ROOT_LOCATION = 's'
const ImagePoolManager = () => {
  const [location, setLocation] = useState([ROOT_LOCATION]);
  const [uploader,setUploader] = useState(false);
  
  return (
    <Box style={{position: 'relative'}}>
      <FileExplorer path={location} onUpload={() => setUploader(true)} updatePath={(newPath) => setLocation(newPath)}/>
      {
        uploader && (
          <Backdrop>
            <ImageUploader path={location.join('/')} onUpload={(i)=> console.log(i)} onClose={() => setUploader(false)}/>
          </Backdrop>
        )
      }
    </Box>
  );
};
export default ImagePoolManager;
