export interface IProductBase {
  id?: string;
  name: string;
  price: number | "";
  description?: string;
  image?: string;
}

export interface IProductFood extends IProductBase {
  veg: boolean;
  category?: string;
}
export type IProduct = IProductBase | IProductFood;
