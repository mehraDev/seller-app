import { IProductFood } from "app/interfaces";
import { addArrayField } from "firebaseServices/firestore";

export const addFoodProduct = async (sellerId: string, product: IProductFood) => {
  try {
    await addArrayField(`sellers/${sellerId}/private/products`, "menu", product);
    console.log("Product added/updated successfully in Firestore:", product);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
