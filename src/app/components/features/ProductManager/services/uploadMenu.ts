import { getSellerId } from "app/services/Shop";
import { IProduct } from "app/interfaces";
import { deleteImageFromFirebase, uploadImageToFirebase } from "firebaseServices/Storage";
import { getLocationSellerProductsImages } from "../constants";
import { getImageFileFromURL } from "ui/Image";
import rewriteProductsList from "./rewriteProducts";
import { generateUniqueId } from "firebaseServices/Utils/UniqueID";
import { EImageSource, determineImageSource } from "./productsImage";
import compressImage, { CompressionOptions } from "ui/Image/utils/ImageCompression";
import convertHEICToWebp from "ui/Image/utils/imageConversion";
import resizeImage from "ui/Image/utils/resizeImage";
import { PRODUCT_CARD_DIMENSIONS } from "../Components/ProductsCard/dimensionsConstants";
import isDataURL from "ui/Image/utils/isDataUrl";
import { EFirebaseErrorCode, FirebaseErrorType } from "firebaseServices/Error";

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

const uploadFoodImage = async (imageFile: File, name: string, location: string): Promise<void> => {
  // const options100kb: CompressionOptions = {
  //   maxSizeMB: 0.1, // 100KB
  //   initialQuality: 1,
  //   outputType: "image/webp",
  //   maxCompressions: 2,
  // };

  // const options15kb: CompressionOptions = {
  //   maxSizeMB: 0.015, // 15KB
  //   initialQuality: 1,
  //   outputType: "image/webp",
  // };

  if (imageFile.type === "image/heic") {
    imageFile = await convertHEICToWebp(imageFile);
  }

  imageFile = await resizeImage(imageFile, PRODUCT_CARD_DIMENSIONS.food.width * 3, PRODUCT_CARD_DIMENSIONS.food.height * 3);

  // const compressedImage100kb = await compressImage(imageFile, options100kb);
  const imageName100kb = `${name}.k100`;
  await uploadImageToFirebase(imageFile, imageName100kb, location);

  // const compressedImage15kb = await compressImage(imageFile, options15kb);
  const imageName15kb = `${name}`;
  await uploadImageToFirebase(imageFile, imageName15kb, location);
};

const deleteFoodImage = async (baseImageName: string, location: string): Promise<void> => {
  if (!baseImageName || !location) return;

  const variants = [".k100", ""];
  for (const variant of variants) {
    const imageNameVariant = `${baseImageName}${variant}`;
    try {
      await deleteImageFromFirebase(imageNameVariant, location);
    } catch (error) {
      const firebaseError = error as FirebaseErrorType;
      if (firebaseError.code !== EFirebaseErrorCode.NotFound) {
        throw error;
      } else {
        console.log(`Image variant "${imageNameVariant}" not found at location "${location}". Skipping.`);
      }
    }
  }
};

const replaceFoodImage = async (newProduct: IProduct, oldProduct: IProduct, location: string) => {
  try {
    if (oldProduct.image && determineImageSource(oldProduct.image) === EImageSource.PERSONAL) {
      await deleteFoodImage(oldProduct.image, location);
    }
    if (newProduct.image) {
      const imageFile = await getImageFileFromURL(newProduct.image);
      const imageName = `${newProduct.name}_${generateUniqueId()}`;
      await uploadFoodImage(imageFile, imageName, location);
      return { ...newProduct, image: imageName };
    }
    return newProduct;
  } catch (error) {
    throw error;
  }
};

const uploadNewProductImages = async (products: IProduct[], inputFileProductsRelativeImages: IProduct[], location: string): Promise<IProduct[]> => {
  try {
    const uploadedImageNewProducts = await Promise.all(
      products.map(async (product) => {
        if (!product.image) {
          return product;
        }

        if (isDataURL(product.image)) {
          const imageFile = await getImageFileFromURL(product.image);
          const imageName = `${product.name}_${generateUniqueId()}`;
          await uploadFoodImage(imageFile, imageName, location);
          return { ...product, image: imageName };
        }

        const relativeUrlImageProduct = inputFileProductsRelativeImages.find((p) => p.id === product.id);
        if (relativeUrlImageProduct) {
          return {
            ...product,
            image: relativeUrlImageProduct.image,
          };
        }
        return product;
      })
    );
    return uploadedImageNewProducts;
  } catch (error) {
    throw error;
  }
};

/**
 * Asynchronously uploads modified product images, ensuring that products exist in the absolute list,
 * and handling image updates when necessary.
 *
 * @param {IProduct[]} modifiedProducts - A list of potentially modified products.
 * @param {IProduct[]} relativeImageProducts - A list of products with relative image URLs.
 * @param {IProduct[]} absoluteImageProducts - A list of products with absolute image URLs.
 * @param {string} location - The storage location for image uploads.
 * @returns {Promise<IProduct[]>} - A promise that resolves to an array of updated products.
 */
const uploadModifiedProductImages = async (modifiedProducts: IProduct[], relativeImageProducts: IProduct[], absoluteImageProducts: IProduct[], location: string): Promise<IProduct[]> => {
  const updatedProductsPromises = modifiedProducts.map(async (modifiedProduct): Promise<IProduct> => {
    const absoluteImageProduct = absoluteImageProducts.find((p) => p.id === modifiedProduct.id);
    const relativeImageProduct = relativeImageProducts.find((p) => p.id === modifiedProduct.id);
    if (!relativeImageProduct || !absoluteImageProduct) {
      throw new Error(`Product with ID ${modifiedProduct.id} not found in previous products.`);
    }
    if (modifiedProduct.image === absoluteImageProduct.image) {
      return { ...modifiedProduct, image: relativeImageProduct.image };
    } else {
      const updatedProduct = await replaceFoodImage(modifiedProduct, relativeImageProduct, location);
      if (!updatedProduct) {
        throw new Error(`Failed to update product with ID ${modifiedProduct.id}.`);
      }
      return updatedProduct;
    }
  });

  return Promise.all(updatedProductsPromises);
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
          await deleteFoodImage(relativeImageInitialProduct.image, location);
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

    const updatedNewProducts = await uploadNewProductImages(newProducts, importedRelativeImageProducts, loc);
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
