import { IProductFood, IVariant, IFoodTag, EFoodTagType } from "app/interfaces/Shop/product";
import isValidBaseProduct, { isValidBaseImageAspectRatio, isValidBaseProductPrice } from "./baseShopValidator";
import { PRODUCT_CARD_DIMENSIONS } from "../../../Components/ProductsCard/dimensionsConstants";
import { EShop } from "app/enums";

const isValidVeg = (veg: boolean): boolean => {
  return typeof veg === "boolean";
};

const isValidCategory = (category: string | undefined): boolean => {
  if (!category) return true;
  return typeof category === "string" && category.trim().length > 0;
};

const isValidVariant = (variant: IVariant): boolean => {
  return typeof variant.variantId === "string" && variant.variantId.trim().length > 0 && typeof variant.name === "string" && variant.name.trim().length > 0 && typeof variant.price === "number" && variant.price > 0;
};

const isValidVariants = (variants: IVariant[] | undefined): boolean => {
  if (!variants) return true;

  if (variants.length === 0) return false;

  return variants.every(isValidVariant);
};

const isValidFoodTag = (tag: IFoodTag): boolean => {
  const isValidTagName = Object.values(EFoodTagType).includes(tag.name as EFoodTagType) || (typeof tag.name === "string" && tag.name.trim().length > 0);
  const isValidColor = !tag.color || (typeof tag.color === "string" && tag.color.trim().length > 0);

  return isValidTagName && isValidColor;
};

const isValidFoodTags = (tags: IFoodTag[] | undefined): boolean => {
  if (!tags) return true;
  return tags.every(isValidFoodTag);
};
const imageWidth = PRODUCT_CARD_DIMENSIONS[EShop.Food].width;
const imageHeight = PRODUCT_CARD_DIMENSIONS[EShop.Food].height;
export const FOOD_IMAGE_ASPECT_RATIO = +(imageWidth / imageHeight).toFixed(2);

const isValidFoodImage = async (product: IProductFood) => {
  const isValid = await isValidBaseImageAspectRatio(product.image, FOOD_IMAGE_ASPECT_RATIO);
  return isValid;
};
const isValidProductFood = async (product: IProductFood, allProducts: IProductFood[]): Promise<boolean> => {
  const isBaseValid = isValidBaseProduct(product, allProducts);
  const isVegValid = isValidVeg(product.veg);
  const isCategoryValid = isValidCategory(product.category);
  const areVariantsValid = isValidVariants(product.variants);
  const areTagsValid = isValidFoodTags(product.tags);
  const isPriceValid = isValidBaseProductPrice(product.price);
  const isPriceOrVariantsValid = product.variants && product.variants.length ? areVariantsValid : isPriceValid;
  const isValidImage = await isValidFoodImage(product);
  console.log("--- Debugging isValidIProductFood ---");
  console.log("isBaseValid:", isBaseValid);
  console.log("isVegValid:", isVegValid);
  console.log("isCategoryValid:", isCategoryValid);
  console.log("areVariantsValid:", areVariantsValid);
  console.log("areTagsValid:", areTagsValid);
  console.log("isPriceOrVariantsValid:", isPriceOrVariantsValid);
  console.log("isPriceValid:", isPriceValid);
  console.log("isValidImage:", isValidImage);
  console.log("------------------------------------");
  return isBaseValid && isVegValid && isCategoryValid && isPriceOrVariantsValid && areTagsValid;
};

export default isValidProductFood;
/**
 * Food Product Validator Documentation:
 *
 * This module provides validation utilities specifically tailored for food products.
 *
 * Validators Defined:
 * 1. isValidVeg(veg: boolean): Ensures the veg field is a boolean.
 * 2. isValidCategory(category: string | undefined): Ensures the category is a valid string (if present).
 * 3. isValidVariant(variant: IVariant): Validates individual variant fields.
 * 4. isValidVariants(variants: IVariant[] | undefined): Validates the variants array; if present, ensures all contained variants are valid.
 * 5. isValidFoodTag(tag: IFoodTag): Validates individual food tags.
 * 6. isValidFoodTags(tags: IFoodTag[] | undefined): Validates the tags array; if present, ensures all contained tags are valid.
 * 7. isValidIProductFood(product: IProductFood, allProducts: IProductBase[]): This is the main validator which checks all fields of a food product for validity.
 *
 * When to Use:
 * Use these validators at the time of form submission or any other scenario where you need to ensure the integrity of food product data.
 *
 * How to Expand:
 * For new product types (like "Drink Product"), create a new validator module similar to this.
 * 1. Define individual field validators first.
 * 2. Combine them in a main product validator function.
 * 3. Follow the interface structure and the validation requirements as closely as possible.
 * 4. If new fields are added to an interface or validation logic needs to be changed, ensure to update the relevant validator function.
 *
 * Important Note:
 * Before implementing new validators or updating existing ones, always review the product interface definitions to ensure accurate validation.
 */
/**
 * Validator Generation Documentation Template:
 *
 * Purpose:
 * Define a set of validation functions tailored for IProductFood interface. The primary goal
 * is to validate data integrity for each field and the entire structure of the IProductFood.
 *
 * --- Interface Details ---
 * Interface Name: IProductFood
 *
 * Fields to Validate (List mandatory fields with *):
 * 1. veg* - Boolean indicating if the food is vegetarian.
 * 2. name* - Non-empty string.
 * 3. variants - If present, all contained variants should be valid. If not present, then price should be validated.
 * 4. price - Positive number. Only validate if variants are not present.
 * 5. category - Non-empty string (if present).
 * 6. description - Non-empty string (if present).
 * 7. image - Non-empty string URL (if present).
 * 8. tags - If present, all contained tags should be valid.
 *
 * Optional Fields (only validate if present):
 * 1. category - Non-empty string.
 * 2. description - Non-empty string.
 * 3. image - Non-empty string URL.
 * 4. tags - Array of valid food tags.
 *
 * --- Expected Output ---
 * The goal is to have validators for mandatory fields, optional fields (if present), and
 * a main validator to check the integrity of the entire product/interface.
 *
 * Naming Conventions:
 * Individual Validators: isValid{FIELD_NAME}
 * Main Validator: isValidIProductFood
 *
 * --- Additional Instructions & Context ---
 * Ensure that if the variants field is present in the IProductFood, the price field is ignored during validation. Conversely, if variants are not present, the price should be validated.
 *
 * Note: Remember to ensure that any added or modified fields in the interface should be reflected
 * in the validator functions.
 */
