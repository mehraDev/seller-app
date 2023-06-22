import { IProductFood } from "../../interfaces/productInterface";
import { IViewerFood } from "../../interfaces/viewerInterface";
import ProductCardFood from "./ProductCardFood";


const ProductViewerFood : React.FC<IViewerFood>= ({ products }) => {
    return (
    <>
        {products.map((foodItem:IProductFood) => (
              <ProductCardFood product={foodItem} />
        ))}
    </>
    )
  };

export default ProductViewerFood;
