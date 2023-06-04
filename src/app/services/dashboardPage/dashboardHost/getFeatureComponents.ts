
import getComponentsFromFeatureList, { ComponentItemType } from "./getComponentsFromFeatureList";
import getFeaturesList, { FeaturesEnum } from "./getFeatures";

const getFeatureComponents = async (): Promise<ComponentItemType[]>=> {
    const featuresList: FeaturesEnum[] = await getFeaturesList();
    const componentList = getComponentsFromFeatureList(featuresList);
    return componentList;
};

export default getFeatureComponents;