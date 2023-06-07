
import getComponentsFromFeatureList, { Feature } from "./getComponentsFromFeatureList";
import getFeaturesList, { FeaturesEnum } from "./getFeaturesList";


const getFeatureComponents = async (): Promise<Feature[]>=> {
    try {
        const featuresList: FeaturesEnum[] = await getFeaturesList();
        const componentList = getComponentsFromFeatureList(featuresList);
        return componentList;
      } catch (error) {
        console.error("Error retrieving feature components:", error);
        throw new Error("Failed to retrieve feature components");
      }
};

export default getFeatureComponents;