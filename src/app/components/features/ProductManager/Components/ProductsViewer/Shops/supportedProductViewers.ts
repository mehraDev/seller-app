import { lazy } from "react";
import { EShop } from "app/enums";
import { IViewerBase, IViewerFood } from "../../../interfaces/viewer";

// export interface IViewerBase {
//   item: IProduct;
//   onPreview?: (item: IProduct) => void;
//   mode?: string;
// }

export type IViewer = IViewerBase | IViewerFood;

const supportedProductViewers: ISupportedProductCardsType = {
  [EShop.Food]: lazy(() => import("./ViewerFood")) as React.LazyExoticComponent<React.FC<IViewerFood>>,
  [EShop.Base]: lazy(() => import("./ViewerFood")) as React.LazyExoticComponent<React.FC<IViewerBase>>,
};

export type ISupportedProductCardsType = {
  [EShop.Food]: React.LazyExoticComponent<React.FC<IViewerFood>>;
  [EShop.Base]: React.LazyExoticComponent<React.FC<IViewerBase>>;
};

export default supportedProductViewers;
