import { FeaturesEnum } from "./Features";

const ShopFeatures =(shopType:string | 0): FeaturesEnum[] => {
  switch (shopType) {
    case 'food':
      return [
        FeaturesEnum.Home,
        FeaturesEnum.Orders,
        FeaturesEnum.Delivery,
        FeaturesEnum.Billing,
        FeaturesEnum.Transactions,
        FeaturesEnum.Statistics,
        FeaturesEnum.Products,
        FeaturesEnum.ImagePoolManager,
        FeaturesEnum.CatalogGenerator
      ];

    case 'clothing':
      return [
        FeaturesEnum.Home,
        FeaturesEnum.Billing,
        FeaturesEnum.Orders,
        FeaturesEnum.Statistics,
        FeaturesEnum.Inventory
      ];
    default:
      return [];
  }
};

export default ShopFeatures;
