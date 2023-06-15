import { IProductFood } from "../../interfaces/productInterface";
import { IViewerFood } from "../../interfaces/viewerInterface";
import FoodCard from "./FoodCard";

const Viewer : React.FC<IViewerFood>= ({ products }) => {
    return (
    <>
        {products.map((foodItem:IProductFood) => (
              <FoodCard product={foodItem} width={49} height={11}/>
        ))}
    </>
    )
  };

export default Viewer;
