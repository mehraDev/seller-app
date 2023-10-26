import { fetchDocument } from "firebaseServices/firestore";
import { PRODUCTS_FILE, getSellerPrivateCollection } from "../constants";
import { getSellerId } from "app/services/Shop";
import { IProduct, IProductFood } from "app/interfaces";
import { DocumentFields } from "firebaseServices/firestore/document";

const getProducts = async (): Promise<IProduct[]> => {
  try {
    const id = getSellerId();
    if (id === null) {
      console.error("Seller id is empty.");
      return [];
    }
    const sellerFolder = getSellerPrivateCollection(id);
    const products = await fetchDocument(sellerFolder, PRODUCTS_FILE);
    const foodProducts = documentToFoodProducts(products);
    return foodProducts;
  } catch (error) {
    const errMsg = "Failed to fetch products";
    console.log(errMsg, error);
    return [];
  }
};

export function documentToFoodProducts(document: DocumentFields | undefined): IProductFood[] {
  if (!document || !document.all || !Array.isArray(document.all)) {
    return [];
  }
  return document.all;
}

export default getProducts;
