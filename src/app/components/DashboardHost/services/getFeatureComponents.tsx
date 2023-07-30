
import Features, { FeaturesEnum, IFeature } from "./Features";
import shopFeatures from "./shopFeatures";
import getProfile from "./getProfile";

const getFeatures = async (): Promise<FeaturesEnum[]> => {
  const profile = await getProfile();
  if(profile && profile.shopType){
    const features = shopFeatures(profile.shopType);
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