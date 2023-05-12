
import getFeaturesList, { FeaturesEnum } from "./featureList";
import getComponentFromFeatureList, { ComponentItemType } from "./getComponentFromFeatureList";

const getFeatureListWithComponents = async (): Promise<ComponentItemType[]>=> {
    const featuresList: FeaturesEnum[] = await getFeaturesList();
    const componentList = getComponentFromFeatureList(featuresList);
    return componentList;
};

export default getFeatureListWithComponents;