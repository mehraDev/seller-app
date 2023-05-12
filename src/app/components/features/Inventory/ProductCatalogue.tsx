import React, { ReactNode } from 'react';
import { Product } from './ProductCatalogueHost';
import { ProductCatalogueContainer } from './styles';

interface ProductCatalogueProps {
  products: Product[];
  childComponent: ReactNode;
}

const ProductCatalogue: React.FC<ProductCatalogueProps> = ({ childComponent }) => {
  return (
    <ProductCatalogueContainer>
      {childComponent}
    </ProductCatalogueContainer>
  );
};

export default ProductCatalogue;
