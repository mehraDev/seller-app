import React, { ReactNode } from 'react';
import { ProductCatalogueContainer } from './styles';
import { Product } from './interface/Product';

interface ProductManagerProps {
  products: Product[];
  childComponent: ReactNode;
}

const ProductManager: React.FC<ProductManagerProps> = ({ childComponent }) => {
  return (
    <ProductCatalogueContainer>
      {childComponent}
    </ProductCatalogueContainer>
  );
};

export default ProductManager;
