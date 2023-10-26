
import Features, { FeaturesEnum, IFeature } from "./Features";
import shopFeatures from "./shopFeatures";
import { getSellerProfile } from "app/services/Shop";

const getFeatures = async (): Promise<FeaturesEnum[]> => {
  const profile = await getSellerProfile();
  if(profile && profile.type){
    const features = shopFeatures(profile.type);
    return features;
  }
  return [];
};

const getFeatureComponents = async (): Promise<IFeature[]>=> {
  try {
        const features: FeaturesEnum[] = await getFeatures();
        const list = features.map((feature) => Features[feature]);
        return list;
      } catch (error) {
        throw new Error("Failed to get feature components");
      }
};

export default getFeatureComponents;