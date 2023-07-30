import React, {  Suspense } from "react";
import { LazyFoodProductForm } from "./supportedForms";
import { IForm } from "../ProductManager/shops/Food/Form";

interface IProductForm extends IForm{
  shopType: string;
}

const ProductForm: React.FC<IProductForm> = ({ shopType,onSubmit }) => {
  const renderProductForm = () => {
    switch (shopType) {
      case "food":
        return <LazyFoodProductForm onSubmit={onSubmit}/>;
      default:
        return null;
    }
  };

  return (
      <Suspense fallback={<div>Loading...</div>}>{renderProductForm()}</Suspense>
  );
};

export default ProductForm;
