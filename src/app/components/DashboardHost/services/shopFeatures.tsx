import { FeaturesEnum } from "./Features";

const ShopFeatures =(shopType:string | 0): FeaturesEnum[] => {
  switch (shopType) {
    case 'food':
      return [
        FeaturesEnum.Home,
        FeaturesEnum.Products,
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
