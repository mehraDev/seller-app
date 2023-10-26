import React, {  Suspense } from "react";
import { IForm } from "../ProductManager/Components/ProductForm/Variants/Food";

interface IProductForm extends IForm{
  shopType: string;
}

const ProductForm: React.FC<IProductForm> = ({ shopType }) => {
  const renderProductForm = () => {
    switch (shopType) {
      case "food":
        return null
        //  <LazyFoodProductForm onSubmit={onSubmit}/>;
      default:
        return null;
    }
  };

  return (
      <Suspense fallback={<div>Loading...</div>}>{renderProductForm()}</Suspense>
  );
};

export default ProductForm;
