import { getSellerId } from "app/services/Shop";
import { IProduct } from "app/interfaces";
import { deleteImageFromFirebase, uploadImageToFirebase } from "firebaseServices/Storage";
import { getLocationSellerProductsImages } from "../constants";
import { getImageFileFromURL } from "ui/Image";
import rewriteProductsList from "./rewriteProducts";
import { generateUniqueId } from "firebaseServices/Utils/UniqueID";
import { EImageSource, determineImageSource } from "./productsImage";

export interface IAllProducts {
  newProducts: IProduct[];
  modifiedProducts: IProduct[];
  unModifiedProducts: IProduct[];
  deletedProducts: IProduct[];
  relativeImageProducts: IProduct[];
  absoluteImageProducts: IProduct[];
  importedRelativeImageProducts: IProduct[];
  importedAbsoluteImageProducts: IProduct[];
}

const uploadNewProductImages = async (products: IProduct[], importedAbsoluteImageProducts: IProduct[], importedRelativeImageProducts: IProduct[], location: string): Promise<IProduct[]> => {
  try {
    const uploadedImageNewProducts = await Promise.all(
      products.map(async (product) => {
        if (!product.image) {
          return product;
        }
        const importedAbsoluteImageProduct = importedAbsoluteImageProducts.find((p) => p.id === product.id);
        if (importedAbsoluteImageProduct) {
          const isImageUnchanged = importedAbsoluteImageProduct.image === product.image;
          const relativeUrlImageProduct = importedRelativeImageProducts.find((p) => p.id === product.id);
          if (isImageUnchanged) {
            if (!relativeUrlImageProduct) {
              throw new Error("Cannot find absolute products in relative product.");
            }
            return {
              ...product,
              image: relativeUrlImageProduct.image,
            };
          } else {
            const imageFile = await getImageFileFromURL(product.image);
            const imageName = `${product.name}_${generateUniqueId()}`;
            await uploadImageToFirebase(imageFile, imageName, location);
            return { ...product, image: imageName };
          }
        } else {
          const imageFile = await getImageFileFromURL(product.image);
          const imageName = `${product.name}_${generateUniqueId()}`;
          await uploadImageToFirebase(imageFile, imageName, location);
          return { ...product, image: imageName };
        }
      })
    );
    return uploadedImageNewProducts;
  } catch (error) {
    throw error;
  }
};

const uploadModifiedProductImages = async (modifiedProducts: IProduct[], relativeImageProducts: IProduct[], absoluteImageProducts: IProduct[], location: string): Promise<IProduct[]> => {
  try {
    const uploadedImagesModifiedProducts = await Promise.all(
      modifiedProducts.map(async (modifiedProduct) => {
        const absoluteImageInitialProduct = absoluteImageProducts.find((p) => p.id === modifiedProduct.id);
        const relativeImageInitialProduct = relativeImageProducts.find((p) => p.id === modifiedProduct.id);

        if (!absoluteImageInitialProduct || !relativeImageInitialProduct) {
          throw new Error("Product not found in either absolute or relative initial products.");
        }

        if (modifiedProduct.image === absoluteImageInitialProduct.image) {
          const updatedModifiedProduct = { ...modifiedProduct, image: relativeImageInitialProduct.image };
          return updatedModifiedProduct;
        } else {
          if (relativeImageInitialProduct.image && determineImageSource(relativeImageInitialProduct.image || "") === EImageSource.PERSONAL) {
            await deleteImageFromFirebase(relativeImageInitialProduct.image, location);
          }
          if (modifiedProduct.image) {
            const imageFile = await getImageFileFromURL(modifiedProduct.image);
            const imageName = `${modifiedProduct.name}__${generateUniqueId()}`;
            await uploadImageToFirebase(imageFile, imageName, location);
            return { ...modifiedProduct, image: imageName };
          } else {
            return { ...modifiedProduct, image: "" };
          }
        }
      })
    );
    return uploadedImagesModifiedProducts;
  } catch (error) {
    throw error;
  }
};

const deleteProductImages = async (deletedProducts: IProduct[], relativeImageProducts: IProduct[], location: string): Promise<boolean> => {
  try {
    await Promise.all(
      deletedProducts.map(async (product) => {
        const relativeImageInitialProduct = relativeImageProducts.find((p) => p.id === product.id);
        if (!relativeImageInitialProduct) {
          throw new Error("Product not found in relative image array.");
        }
        if (relativeImageInitialProduct.image && determineImageSource(relativeImageInitialProduct.image) === EImageSource.PERSONAL) {
          await deleteImageFromFirebase(relativeImageInitialProduct.image, location);
        }
      })
    );
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const processUnmodifiedProducts = (unModifiedProducts: IProduct[], relativeImageProducts: IProduct[]): IProduct[] => {
  try {
    const result = unModifiedProducts.map((product) => {
      const relativeImageInitialProduct = relativeImageProducts.find((p) => p.id === product.id);

      if (!relativeImageInitialProduct) {
        throw new Error("Product not found in either relative image array.");
      }
      return { ...product, image: relativeImageInitialProduct.image || "" };
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const uploadMenu = async (state: IAllProducts) => {
  const { newProducts, modifiedProducts, unModifiedProducts, deletedProducts, relativeImageProducts, absoluteImageProducts, importedAbsoluteImageProducts, importedRelativeImageProducts } = state;
  try {
    const sellerId = getSellerId();
    if (sellerId === null) {
      throw new Error("Invalid Seller Id.");
    }
    const loc = getLocationSellerProductsImages(sellerId);

    const updatedNewProducts = await uploadNewProductImages(newProducts, importedAbsoluteImageProducts, importedRelativeImageProducts, loc);
    const updatedModifiedProducts = await uploadModifiedProductImages(modifiedProducts, relativeImageProducts, absoluteImageProducts, loc);
    await deleteProductImages(deletedProducts, relativeImageProducts, loc);
    const updatedUnmodifiedProducts = processUnmodifiedProducts(unModifiedProducts, relativeImageProducts);
    const allProducts = [...updatedNewProducts, ...updatedModifiedProducts, ...updatedUnmodifiedProducts];
    await rewriteProductsList(allProducts, sellerId);
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default uploadMenu;
