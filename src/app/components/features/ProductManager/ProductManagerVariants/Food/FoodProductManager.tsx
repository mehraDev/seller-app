import { Product } from "../../interface/Product";
import ProductsViewer from "./Viewer";
import { ProductManagerWrapper } from "./styles";

export interface FoodProductManagerTypes{
  products: Product[];
}

const FoodProductManager : React.FC<FoodProductManagerTypes>= ({ products }) => {
    return (
        <ProductManagerWrapper>
            {/* <Controls/> */}
            <ProductsViewer  products={products}/>
        </ProductManagerWrapper>);
  };

  export default FoodProductManager;