import React, { useState, useEffect } from 'react';
import ProductCatalogue from './ProductCatalogue';
import { getProductCatalogueList } from 'app/services/features/ProductCatalogue';
import ProductCatalogueVariants from './Types/ProductCatalogueComponentTypes';

export interface Product {
  id: number;
  name: string;
  price?: number;
  description?: string;
}

const ProductCatalogueHost: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shopType, setShopType] = useState<string>(''); 
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const checkAuthorization = (): boolean => {
      return true;
    };

    const onLoadProductCatalogue = async (): Promise<void> => {
      try {
        const response = await getProductCatalogueList();
        setShopType('food');
        setHasData(true);
        setIsLoading(false);
        setProducts(response);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    if (checkAuthorization()) {
      if (!hasData) {
        onLoadProductCatalogue();
      } else {
        setIsLoading(false);
      }
    } else {
      
    }
  }, [hasData]);

  const InventoryViewer = ProductCatalogueVariants[shopType];

  if (isLoading) {
    return <div >Loading...</div>;
  }

  if (error) {
    return <div>Eror</div>;
  }
    
    return <ProductCatalogue products={products} childComponent={<InventoryViewer products={products} />} />;
};

export default ProductCatalogueHost;
