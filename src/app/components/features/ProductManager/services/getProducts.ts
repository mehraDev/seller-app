import { IProduct } from "app/interfaces/Shop/product";

const getProducts = async (): Promise<IProduct[]> => {
  try {
    const response: IProduct[] = [];
    return response;
  } catch (error) {
    const errMsg = "Failed to fetch products";
    console.log(errMsg);
    throw new Error(errMsg);
  }
};

export default getProducts;
