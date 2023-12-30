import React from "react";
import { IViewerFood } from "../../../../interfaces/viewer";
import FoodMenu1 from "./T1/FoodMenu1";

const ViewerFood: React.FC<IViewerFood> = ({ products }) => {
  return (
    <FoodMenu1 products={products}/>
  );
};

export default ViewerFood;

