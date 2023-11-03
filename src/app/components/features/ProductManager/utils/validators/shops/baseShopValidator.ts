import { IProductBase } from "app/interfaces/Shop/product";

export const isValidBaseProductName = (name: string): boolean => {
  return typeof name === "string" && name.trim().length > 0;
};

export const isValidBaseProductPrice = (price: number | "" | undefined): boolean => {
  if (typeof price === "number") {
    return price > 0;
  }
  return false;
};

export const isValidBaseProductDescription = (description: string | undefined): boolean => {
  if (description) {
    return typeof description === "string";
  }
  return true;
};

export const isValidBaseProductImage = (image: string | undefined): boolean => {
  if (image) {
    return typeof image === "string" && image.trim().length > 0;
  }
  return true;
};

export const isValidBaseProductID = (id: string | undefined, allProducts: IProductBase[]): boolean => {
  if (!id) {
    return false;
  }

  if (typeof id !== "string" || id.trim().length === 0) {
    return false;
  }

  const existingProduct = allProducts.find((product) => product.id === id);
  if (existingProduct) {
    return false;
  }
  return true;
};

const isValidBaseProduct = (product: IProductBase, allProducts: IProductBase[]): boolean => {
  const isNameValid = isValidBaseProductName(product.name);
  const isIDValid = isValidBaseProductID(product.id, allProducts);
  return isNameValid && isIDValid;
};

export default isValidBaseProduct;

/**
 * Base Product Validator Documentation:
 *
 * This module provides validation utilities specifically tailored for base products.
 *
 * Validators Defined:
 * 1. isValidBaseProductName(name: string): Ensures the name is a non-empty string.
 * 2. isValidBaseProductPrice(price: number | "" | undefined): Ensures the price is a positive number.
 * 3. isValidBaseProductDescription(description: string | undefined): Ensures the description is a string (if present).
 * 4. isValidBaseProductImage(image: string | undefined): Ensures the image URL is a valid string (if present).
 * 5. isValidBaseProductID(id: string | undefined, allProducts: IProductBase[]): Ensures the ID is unique across all products and is a non-empty string.
 * 6. isValidBaseProduct(product: IProductBase, allProducts: IProductBase[]): This is the main validator which checks all fields of a base product for validity.
 *
 * When to Use:
 * Use these validators at the time of form submission or any other scenario where you need to ensure the integrity of base product data.
 *
 * How to Expand:
 * For new product types (like "Food Product"), create a new validator module similar to this.
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
 * Define a set of validation functions tailored for a specific interface. The primary goal
 * is to validate data integrity for each field and the entire structure of the given interface.
 *
 * --- Interface Details ---
 * Interface Name: {INTERFACE_NAME_HERE}
 *
 * Fields to Validate (List mandatory fields with *):
 * 1. {FIELD_NAME_1}* - {VALIDATION_CRITERIA_1}
 * 2. {FIELD_NAME_2} - {VALIDATION_CRITERIA_2}
 * ...
 *
 * Optional Fields (only validate if present):
 * 1. {OPTIONAL_FIELD_NAME_1} - {VALIDATION_CRITERIA_1}
 * 2. {OPTIONAL_FIELD_NAME_2} - {VALIDATION_CRITERIA_2}
 * ...
 *
 * --- Expected Output ---
 * The goal is to have validators for mandatory fields, optional fields (if present), and
 * a main validator to check the integrity of the entire product/interface.
 *
 * Naming Conventions:
 * Individual Validators: isValid{FIELD_NAME}
 * Main Validator: isValid{INTERFACE_NAME}
 *
 * --- Additional Instructions & Context ---
 * {ANY_OTHER_SPECIFIC_INSTRUCTIONS_OR_INFO_YOU_WANT_TO_ADD}
 *
 * Note: Remember to ensure that any added or modified fields in the interface should be reflected
 * in the validator functions.
 */
