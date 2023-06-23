
import getComponentsFromFeatureList, { Feature } from "./getComponentsFromFeatureList";
import getFeaturesList, { FeaturesEnum } from "./getFeaturesList";

const cacheName = "dashboard";
const cacheKey = "featuresList";

const getCachedFeaturesList = async (): Promise<FeaturesEnum[]> => {
  if ("caches" in window) {
    try {
      const cache = await caches.open(cacheName);
      const cachedResponse = await cache.match(cacheKey);

      if (cachedResponse) {
        const featuresList: FeaturesEnum[] = await cachedResponse.json();
        return featuresList;
      }

      const fetchedFeaturesList = await getFeaturesList();
      await cache.put(cacheKey, new Response(JSON.stringify(fetchedFeaturesList)));
      return fetchedFeaturesList;
    } catch (error) {
      console.error("Error retrieving or caching feature list:", error);
      throw new Error("Failed to retrieve or cache feature list");
    }
  }
  // Fallback to fetching the features list directly if Cache API is not available
  const fetchedFeaturesList = await getFeaturesList();
  return fetchedFeaturesList;
};

const getFeatures = async (): Promise<Feature[]>=> {
    try {
        const featuresList: FeaturesEnum[] = await getCachedFeaturesList();
        const componentList = getComponentsFromFeatureList(featuresList);
        return componentList;
      } catch (error) {
        console.error("Error retrieving feature components:", error);
        throw new Error("Failed to retrieve feature components");
      }
};

export default getFeatures;