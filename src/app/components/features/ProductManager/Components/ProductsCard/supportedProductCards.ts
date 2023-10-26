import { lazy } from "react";
import { IItemFoodCard } from "./Food";
import { IProduct } from "app/interfaces";
import { EShop } from "app/enums";

export interface IItemBaseCard {
  item: IProduct;
  onPreview?: (item: IProduct) => void;
  mode?: string;
}

export type IItemCard = IItemBaseCard | IItemFoodCard;

const supportedProductCards: ISupportedProductCardsType = {
  [EShop.Food]: lazy(() => import("./Food")) as React.LazyExoticComponent<React.FC<IItemFoodCard>>,
  [EShop.Base]: lazy(() => import("./Base")) as React.LazyExoticComponent<React.FC<IItemBaseCard>>,
};

export type ISupportedProductCardsType = {
  [EShop.Food]: React.LazyExoticComponent<React.FC<IItemFoodCard>>;
  [EShop.Base]: React.LazyExoticComponent<React.FC<IItemBaseCard>>;
};

export default supportedProductCards;
