import React, { useState, useEffect, lazy } from 'react';
import { getProductCatalogueList } from 'app/services/features/ProductCatalogue';
import { IProduct, IProductManager } from './interface/Product';
import LoadingAnimation from 'ui/LoadingAnimation/LoadingAnimation';
import {  IFoodProductManager } from './ProductManagerVariants/Food/FoodProductManager';
import styled from 'styled-components';

interface ProductManagerVariantsTypes {
  [key: string]: React.FC<IProductManager>;
  food: React.FC<IFoodProductManager>;
}

const ProductManagerVariants: ProductManagerVariantsTypes = {
  food: lazy(() => import('./ProductManagerVariants/Food/FoodProductManager')),
};

const ProductManagerHost: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shopType, setShopType] = useState<string>(''); 
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const checkAuthorization = (): boolean => {
      return true;
    };

    const loadFeatureData = async (): Promise<void> => {
      try {
        const response = await getProductCatalogueList();
        // await getProducts();
        setShopType('food');
        setHasData(true);
        setProducts(response);
        // await saveProductsToDB(response);
      } catch (error: any) {
        console.log(error)
        setError(error.message);
        setIsLoading(false);
      }
    };

    if (checkAuthorization()) {
      if (!hasData) {
        loadFeatureData();
      } else {
        setIsLoading(false);
      }
    } else {
      
    }
  }, [hasData]);

  const Manager = ProductManagerVariants[shopType];

  if (isLoading) {
    return <LoadingAnimation/>
  }

  if (error) {
    return <div>Eror</div>;
  }
    
  return (
    <ProductMangerWrapper>
      <Manager products={products} />
    </ProductMangerWrapper>)
};

export const ProductMangerWrapper = styled.div`
    height: 100%;
`;
export default ProductManagerHost;
