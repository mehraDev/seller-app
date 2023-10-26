import { getLocationSellerProductsImages } from "app/constants/storage";

export const PRODUCTS_FILE = "products";
export const getSellerPrivateCollection = (sellerId: string): string => {
  return `sellers/${sellerId}/private`;
};

export { getLocationSellerProductsImages };
