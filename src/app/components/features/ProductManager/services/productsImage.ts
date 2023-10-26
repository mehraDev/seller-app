import { getUrlImageStorage } from "firebaseServices/Storage";
import { getLocationSellerProductsImages } from "../constants";
import { IProduct } from "app/interfaces";
import { getSellerId } from "app/services/Shop";
import { EShop } from "app/enums";
import { getLocationPoolProductsImages } from "app/constants/storage";

const getPersonalImageURL = (productName: string, sellerID: string): string => {
  const absoluteLocation = getLocationSellerProductsImages(sellerID) + productName;
  const imageUrl = `${getUrlImageStorage(absoluteLocation)}?alt=media`;
  return imageUrl;
};

const getImageUrlForProduct = (image: string, seller: string, shop: EShop): string => {
  const imageSource: "pool" | "personal" = determineImageSource(image);
  if (imageSource === "pool") {
    return getPoolImageURL(image, shop);
  } else {
    return getPersonalImageURL(image, seller);
  }
};
export enum EImageSource {
  POOL = "pool",
  PERSONAL = "personal",
}

const determineImageSource = (imageName: string): EImageSource => {
  if (imageName.endsWith("_p")) {
    return EImageSource.POOL;
  } else {
    return EImageSource.PERSONAL;
  }
};

const getPoolImageURL = (image: string, shop: EShop): string => {
  const absoluteLocation = getLocationPoolProductsImages(shop) + image;
  const imageUrl = `${getUrlImageStorage(absoluteLocation)}?alt=media`;
  return imageUrl;
};

function addImageUrlsToProducts(products: IProduct[], shop: EShop): IProduct[] {
  const sellerID = getSellerId();
  const productsWithImageUrls: IProduct[] = [];

  for (const product of products) {
    if (product.image) {
      const imageUrl = getImageUrlForProduct(product.image, sellerID ? sellerID : "", shop);
      const productWithImageUrl: IProduct = {
        ...product,
        image: imageUrl,
      };
      productsWithImageUrls.push(productWithImageUrl);
    } else {
      productsWithImageUrls.push(product);
    }
  }

  return productsWithImageUrls;
}

export { getImageUrlForProduct, addImageUrlsToProducts, determineImageSource };
