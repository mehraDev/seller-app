import { Product } from "app/components/features/Inventory/ProductCatalogueHost";
import panjTaraData from "store/menu/menu";
export const getProductCatalogueList = async (): Promise<Product[]> => {
    try {
  
      const response: Product[] = panjTaraData;
  
      return response;
    } catch (error) {
      throw new Error('Failed to fetch inventory data');
    }
  };