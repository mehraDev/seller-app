import { IFoodProduct } from "../../interface/Product";
import FoodProductCard from "./FoodProductCard";
import { ProductsViewerWrapper } from "./styles";

export interface ViewerTypes{
  products: IFoodProduct[];
}

const Viewer : React.FC<ViewerTypes>= ({ products }) => {
    return (
    <ProductsViewerWrapper>
            {products.map((product:IFoodProduct) => (
              <FoodProductCard product={product} width={49} height={11}/>
            ))}
    </ProductsViewerWrapper>
    )
  };

  export default Viewer;