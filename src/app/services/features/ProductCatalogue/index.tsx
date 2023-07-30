
import { IProduct } from "app/interfaces/Shop/product";
import panjTaraData from "./dummyDAta";

export const getProductCatalogueList = async (): Promise<IProduct[]> => {
    try {
      const response: IProduct[] = panjTaraData;
      return response;
    } catch (error) {
      const errMsg = 'Failed to fetch products';
      console.log(errMsg)
      throw new Error(errMsg);
    }
  };