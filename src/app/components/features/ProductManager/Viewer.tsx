import styled from "styled-components";
import { IProduct } from "./interfaces/productInterface";
import shopList from "./shops/supportedShopsList";

export interface IViewer{
  products: IProduct[];
  shop: string;
}

const Viewer : React.FC<IViewer>= ({ products ,shop }) => {
  const ShopViewer = shopList[shop]; 
  return (
    <StyledWrapper>
      <ShopViewer products={products}/>
    </StyledWrapper>
    )
  };

  export const StyledWrapper = styled.div`
    height: calc(100%);
    overflow: scroll;
    padding: 1rem;
    display: flex;
    gap: 2%;
    flex-wrap: wrap;
`;
  export default Viewer;