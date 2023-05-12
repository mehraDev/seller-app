import { lazy } from 'react';
import { FoodProductCatalogueTypes } from './Food/FoodProductCatalogue';

interface ProductCatalogueVariantsTypes {
  [key: string]: React.FC<FoodProductCatalogueTypes>;
  food: React.FC<FoodProductCatalogueTypes>;
  cloth: React.FC<FoodProductCatalogueTypes>;
}


const ProductCatalogueVariants: ProductCatalogueVariantsTypes = {
  food: lazy(() => import('./Food/FoodProductCatalogue')),
  cloth: lazy(() => import('./Cloth/ClothProductCatalogue'))
};

export default ProductCatalogueVariants;