import { Box, Text } from "ui/basic";

const InitialMessage : React.FC= () => {
    return (
        <Box a="center" p="0 0 12rem" h="100%">
            <Box fd="c" a="center" p="2rem 1rem">
                <Text mb="1rem" s="16" c="#868686">Let's add some items to your store</Text>
                <button>Add Product</button>
                <button>Upload from File</button>
            </Box>
        </Box>
      
    );
  };

export default InitialMessage;