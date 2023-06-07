import React, { useState, useEffect } from 'react';
import { getProductCatalogueList } from 'app/services/features/ProductCatalogue';
import { Product } from './interface/Product';
import ProductManager from './ProductManager';
import ProductManagerVariants from './ProductManagerVariants/ProductManagerVariants';
import LoadingAnimation from 'ui/LoadingAnimation/LoadingAnimation';

const ProductManagerHost: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shopType, setShopType] = useState<string>(''); 
  const [products, setProducts] = useState<Product[]>([]);

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
    
    return <ProductManager products={products} childComponent={<Manager products={products} />} />;
};

export default ProductManagerHost;
