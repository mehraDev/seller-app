import getShopType from "./getShopType";


export enum FeaturesEnum {
  Home = "Home",
  Billing = "Billing",
  Orders = "Orders",
  Statistics = "Statistics",
  Delivery = "Delivery",
  Inventory = "Inventory",
  Transactions = "Transactions",
  Products = "Products",
  ImagePoolManagerAdmin = 'ImagePoolManagerAdmin'
}

const getFeaturesList = async (): Promise<FeaturesEnum[]> => {
 try{
  const shopType = await getShopType();

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
        FeaturesEnum.ImagePoolManagerAdmin
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
      return []; // Return an empty array if the shopType is not recognized
  }
 } catch (error){
  throw error;
 }
};

export default getFeaturesList;
