import { Product } from "app/components/features/ProductManager/interface/Product";

import checkProductsInDB from "./checkProductsInDB";
import fetchProducts from "./fetchProducts";
import { auth } from "firebaseServices/firebase";
import saveProductsDB from "./saveProductsToDB";
export const getProducts = async (): Promise<Product[]> => {
    try {
      const user = auth.currentUser;
        if (!user) {
          throw new Error('User is not authenticated');
        }
        // const storedData = await checkProductsInDB();
            if (storedData) {
              console.log(storedData);
            return storedData;
            }
            const response: Product[] = await fetchProducts();
            console.log(response)
            await saveProductsDB(response.productList);
        
            return response;
    } catch (error) {
      throw new Error('Failed to fetch inventory data');
    }
  };
