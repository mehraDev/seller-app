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
  const featuresList: FeaturesEnum[] = [
    FeaturesEnum.Dashboard,
    FeaturesEnum.Billing,
    FeaturesEnum.Orders,
    FeaturesEnum.Statistics,
    FeaturesEnum.Delivery,
    FeaturesEnum.Catalogue,
    FeaturesEnum.Transactions,
  ];
  
  return featuresList;
  };
  
export default getFeaturesList;