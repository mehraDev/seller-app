export interface IProductBase {
  id?: string;
  name: string;
  price?: number | "";
  description?: string;
  image?: string;
}

export interface IVariant {
  variantId: string;
  name: string;
  price: number;
  isAvailable?: boolean;
  default?: boolean;
}

export interface IProductFood extends IProductBase {
  veg: boolean;
  category?: string;
  variants?: IVariant[];
  tags?: IFoodTag[];
}
export interface IFoodTag {
  label: string;
  type: EFoodTagType | string;
  color?: string;
}

export enum EFoodTagType {
  BEST_SELLER = "BEST_SELLER",
  RECOMMENDED = "RECOMMENDED",
}

export type IProduct = IProductBase | IProductFood;
