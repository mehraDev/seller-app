
import { FoodProduct, Product } from "../../interface/Product";

import FoodProductCard from "./FoodProductCard";
import { ProductsViewerWrapper } from "./styles";

export interface ViewerTypes{
  products: FoodProduct[];
}

const Viewer : React.FC<ViewerTypes>= ({ products }) => {
    return (
    <ProductsViewerWrapper>
            {products.map((product:FoodProduct) => (
              <FoodProductCard product={product} width={49} height={11}/>
            ))}
    </ProductsViewerWrapper>
    )
  };

  export default Viewer;