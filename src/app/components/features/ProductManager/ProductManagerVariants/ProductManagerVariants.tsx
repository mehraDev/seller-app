import { lazy } from 'react';
import { FoodProductManagerTypes } from './Food/FoodProductManager';

interface ProductManagerVariantsTypes {
  [key: string]: React.FC<FoodProductManagerTypes>;
  food: React.FC<FoodProductManagerTypes>;
  cloth: React.FC<FoodProductManagerTypes>;
}


const ProductManagerVariants: ProductManagerVariantsTypes = {
  food: lazy(() => import('./Food/FoodProductManager')),
  cloth: lazy(() => import('./Cloth/ClothProductCatalogue'))
};

export default ProductManagerVariants;