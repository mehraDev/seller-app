import getShopType from "./getShopType";


export enum FeaturesEnum {
  Dashboard = "Dashboard",
  Billing = "Billing",
  Orders = "Orders",
  Statistics = "Statistics",
  Delivery = "Delivery",
  Inventory = "Inventory",
  Transactions = "Transactions",
  Catalogue = "Catalogue"
}

const getFeaturesList = async (): Promise<FeaturesEnum[]> => {
 try{
  const shopType = await getShopType();

  switch (shopType) {
    case 'food':
      return [
        FeaturesEnum.Dashboard,
        FeaturesEnum.Orders,
        FeaturesEnum.Delivery,
        FeaturesEnum.Billing,
        FeaturesEnum.Transactions,
        FeaturesEnum.Statistics,
        FeaturesEnum.Catalogue,
      ];

    case 'clothing':
      return [
        FeaturesEnum.Dashboard,
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
