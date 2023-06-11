import { IFoodProduct } from "../../interface/Product";
import ProductsViewer from "./Viewer";
import {  ProductManagerWrapper } from "./styles";

export interface IFoodProductManager{
  products: IFoodProduct[];
}

const FoodProductManager : React.FC<IFoodProductManager>= ({ products }) => {
    return (
        <ProductManagerWrapper>
            <ProductsViewer  products={products}/>
        </ProductManagerWrapper>);
  };

  export default FoodProductManager;