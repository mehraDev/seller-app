import { IProduct } from "app/interfaces";
import { createDocument } from "firebaseServices/firestore/document";

const rewriteProductsList = async (products: IProduct[], id: string) => {
  try {
    const menuData = { all: products };
    await createDocument(`sellers/${id}/private`, "products", menuData);
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default rewriteProductsList;
