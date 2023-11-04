import { EShop } from "app/enums";
import { IProduct, IProductFood } from "app/interfaces/Shop/product";

function isProductFood(product: IProduct): product is IProductFood {
  return "veg" in product;
}

const validatorMap: Record<EShop, () => Promise<any>> = {
  [EShop.Base]: () => import("./shops/baseShopValidator"),
  [EShop.Food]: () => import("./shops/foodShopValidator"),
};

export const isProductValid = async (product: IProduct, allProducts: IProduct[], shopType: EShop): Promise<boolean> => {
  if (!validatorMap[shopType]) {
    throw new Error(`No validator found for shop type: ${shopType}`);
  }

  const importedModule = await validatorMap[shopType]();
  const validator = importedModule.default;

  if (shopType === EShop.Food && !isProductFood(product)) {
    throw new Error("The provided product is not of type IProductFood");
  }

  return validator(product, allProducts);
};
/**
 * Dynamic Module Import with Shop Type Mapping Documentation:
 *
 * This module is designed to dynamically import and apply validator functions based on the `shopType`.
 * Through TypeScript's type guards and enums, this ensures that the correct validator is dynamically imported and applied.
 * This system aids in efficient code splitting and a reduction in the initial bundle size.
 *
 * Modules Defined:
 * 1. isProductFood(product: IProduct): A type guard to determine if the product is of type `IProductFood`.
 * 2. validatorMap: Maps each `shopType` to its respective validator module path.
 * 3. isProductValid(allProducts: IProduct[], product: IProduct, shopType: EShop): The main function interpreting the shop type, importing the relevant validator, ensuring type correctness, and validating the product.
 *
 * When to Use:
 * Use this module when needing to validate products based on their type and shop. Especially useful when integrating multiple shop types and their respective validators.
 *
 * How to Expand:
 * For integrating new shop types or validators:
 * 1. Extend the `EShop` enum with the new shop type.
 * 2. Add a corresponding entry in the `validatorMap`.
 * 3. If a new product type is introduced, consider extending the type guard function `isProductFood` or introducing a new type guard.
 *
 * Important Note:
 * Ensure that each shop type has an associated validator. Failing to map a shop type to a validator will throw an error during runtime.
 */

/**
 * Dynamic Module Import with Shop Type Mapping Template:
 *
 * Purpose:
 * Facilitate dynamic importation of validator functions based on a given `shopType`. This provides flexibility and efficiency in product validation processes.
 *
 * --- Module Details ---
 * Main Module Name: Dynamic Module Import with Shop Type Mapping
 *
 * Defined Functions:
 * 1. isProductFood(product: IProduct): Determines if the product is of type `IProductFood`.
 * 2. isProductValid(allProducts: IProduct[], product: IProduct, shopType: EShop): Main function to validate products based on shop type.
 *
 * --- Expected Output ---
 * For a given product and shop type, the main function should return a boolean indicating the validity of the product for that shop.
 *
 * Naming Conventions:
 * Type Guard Functions: is<TypeName>
 * Main Function: isProductValid
 *
 * --- Additional Instructions & Context ---
 * Always ensure that the correct shop type is provided as this determines which validator is used. Incorrect or mismatched types will result in errors.
 *
 * Note: When adding new shop types, always ensure a corresponding validator is created and mapped correctly.
 */
