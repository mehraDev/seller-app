import { IProduct, IProductFood } from "app/interfaces";

export interface IViewer{
    products: IProduct[];
  }

  export interface IViewerFood{
    products: IProductFood[];
  }