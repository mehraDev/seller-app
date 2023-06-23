import getComponentsFromFeatures, { Feature } from "./getComponentsFromFeatures";
import getFeaturesFromShopType, { FeaturesEnum } from "./getFeaturesFromShopType";
import getShopType from "./getShopType";

const getFeatures = async (): Promise<FeaturesEnum[]> => {
  const shopType = await getShopType();
  const features = getFeaturesFromShopType(shopType);
  return features;
};

const getFeatureComponents = async (): Promise<Feature[]>=> {
  
    try {
        const features: FeaturesEnum[] = await getFeatures();
        const components = getComponentsFromFeatures(features);
        return components;
      } catch (error) {
        throw new Error("Failed to get feature components");
      }
};

export default getFeatureComponents;