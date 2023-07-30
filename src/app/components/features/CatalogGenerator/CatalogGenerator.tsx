import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductForm from "./ProductForm";
import Viewer from "../ProductManager/Viewer";
import Box, { Col, Row } from "ui/basic/Box";
import { IProductFood } from "app/interfaces";
import ImageSelection from "./ImageSelection/ImageSelection";
import { Text } from "ui/basic";
import { fetchShopType } from "app/services/Shop";

const CatalogGenerator: React.FC = () => {
  const [sellerId, setSellerId] = useState("");
  const [products, setProducts] = useState<IProductFood[]>([]);
  const [shopType, setShopType] = useState<string>('food');
  const [formStage ,  setFormStage] = useState<'info' | 'image'>('info');
  const [formProduct, setFormProduct] = useState<IProductFood>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  useEffect(() => {
    const onSellerId = async (sellerId: string) => {
      try {
        // Simulated API call
        const shop = await fetchShopType(sellerId)
        setShopType(shop);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching shop type:", error);
      }
    };

    if (sellerId) {
      setIsLoading(true);
      onSellerId(sellerId);
    }
  }, [sellerId]);


  const handleInfoSubmit = (product: IProductFood) => {
    setFormStage( 'image')
    setFormProduct( product);
  }
  // const handleAddProduct = (product: IProductFood) => {
   
  // };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the selected file

    if (file) {
      // Check if the file extension is ".menu"
      if (file.name.endsWith(".menu")) {
        // Read the file content
        const reader = new FileReader();

        reader.onload = (e) => {
          try {
            const content = e.target?.result as string;
            const parsedData = JSON.parse(content);
            console.log(parsedData)
            // Do something with the parsed data, e.g., add it to the products state
            // Assuming the parsed data is an array of products:
            setProducts((prevProducts) => [...prevProducts, ...parsedData]);
          } catch (error) {
            console.error("Error parsing file content:", error);
          }
        };

        reader.readAsText(file);
      } else {
        console.log("Invalid file format. Please select a .menu file.");
      }
    }
  };
  const handleSaveCatalog = () => {
    const jsonContent = JSON.stringify(products);
    const blob = new Blob([jsonContent], { type: "application/json" });

    // Create a URL for the Blob to create a downloadable link
    const url = URL.createObjectURL(blob);

    // Create a link element and simulate a click to initiate download
    const link = document.createElement("a");
    link.href = url;
    link.download = "catalog.menu";
    document.body.appendChild(link);
    link.click();

    // Clean up by revoking the URL
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };
  const [sellerIdInput,setSellerIdInput] = useState('');
  // if(!sellerId){
  //   return(
  //     <Box>
  //       <Col>
  //       <Text>Enter Seller Id</Text>
  //       <InputText value={sellerIdInput} onChange={value => setSellerIdInput(value)} />
  //       <Button onClick={() => setSellerId(sellerIdInput)}>submit</Button>
  //       </Col>
  //     </Box>
  //   )
  // }
  if (!isLoading) {
    return <div>Loading...</div>; // Render a loading screen
  }
  return (
    <Wrapper>
      <Row>
        <Text>{shopType}</Text>
      </Row>
      <ControlPanel>
      <input type="file" accept=".menu" onChange={handleFileChange} />
      <Button onClick={handleSaveCatalog}>Save Catalog</Button>
        <Button>Export Catalog</Button>
      </ControlPanel>
      <Row>
        <Box j="center">
        {formStage === 'info' ? 
        (<ProductForm shopType={'food'} onSubmit={(product) => handleInfoSubmit(product)}/>) :
          <ImageSelection name={formProduct?.name as string} sellerId={sellerId} onImageSelected={function (imageUrl: string): void {
              throw new Error("Function not implemented.");
            } }/>
        }
        </Box>
        <Box j="center">
          {products.length ? <Viewer shop={shopType} products={products}/> : <Col w="initial">Emprty List</Col>}
        </Box>
      </Row>
    </Wrapper>
  );
};


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ControlPanel = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Button = styled.button`
  margin: 0 10px;
`;


export default CatalogGenerator;
