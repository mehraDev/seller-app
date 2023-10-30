import React from "react";
import { IViewerFood } from "../../../interfaces/viewer";
import CategoryViewer from "../Common/CategoryViewer";

const ViewerFood: React.FC<IViewerFood> = ({ products }) => {
  return (
    <CategoryViewer products={products} />
  );
};

export default ViewerFood;

