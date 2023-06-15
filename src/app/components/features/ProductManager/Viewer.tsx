import styled from "styled-components";
import { IProduct } from "./interfaces/productInterface";
import shopViewer from "./shops/shopViewer";

export interface IViewer{
  products: IProduct[];
  shop: string;
}

const Viewer : React.FC<IViewer>= ({ products ,shop }) => {
  const ShopViewer = shopViewer[shop]; 
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