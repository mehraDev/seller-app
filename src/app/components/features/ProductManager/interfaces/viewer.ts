import { EShop } from "app/enums";
import { IProduct, IProductFood } from "app/interfaces";

export interface IViewerBase {
  products: IProduct[];
}

export interface IViewerFood extends IViewerBase {
  products: IProductFood[];
}

export interface IProductViewerEditable {
  products: IProduct[];
  shop: EShop;
}
