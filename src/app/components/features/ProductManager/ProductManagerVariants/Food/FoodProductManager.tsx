import styled from "styled-components";
import { Product } from "../../interface/Product";
import ProductsViewer from "./Viewer";
import {  ProductManagerWrapper } from "./styles";
import Options from "./OptionUI/Option";
import OptionsList from "./OptionUI/OptionList";

export interface FoodProductManagerTypes{
  products: Product[];
}

const FoodProductManager : React.FC<FoodProductManagerTypes>= ({ products }) => {
    return (
        <ProductManagerWrapper>
          <Options >
            <OptionsList />
          </Options>
            <ProductsViewer  products={products}/>
        </ProductManagerWrapper>);
  };

  const ManagerOptions = styled.div`
    position: absolute;
  `;
  export default FoodProductManager;