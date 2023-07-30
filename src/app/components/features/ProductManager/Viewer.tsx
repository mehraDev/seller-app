import shopList from "./shops/supportedShopsList";
import { IProduct } from "app/interfaces";
import { Box, Text } from "ui/basic";
import { Card } from "ui/Card";

export interface IViewer {
  products: IProduct[];
  shop: string;
}

const Viewer : React.FC<IViewer>= ({ products ,shop }) => {
  
  
  const ShopViewer = shopList[shop]; 
  return (
    <Box>
      <ShopViewer products={products}/>
    </Box>
    )
  };

  export default Viewer;