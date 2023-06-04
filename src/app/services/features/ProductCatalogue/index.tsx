import { Product } from "app/components/features/ProductManager/interface/Product";
import panjTaraData from "store/menu/menu";
export const getProductCatalogueList = async (): Promise<Product[]> => {
    try {
      const response: Product[] = panjTaraData;
      return response;
    } catch (error) {
      const errMsg = 'Failed to fetch products';
      console.log(errMsg)
      throw new Error(errMsg);
    }
  };