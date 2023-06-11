import React, { useState, useEffect, lazy } from 'react';
import { getProductCatalogueList } from 'app/services/features/ProductCatalogue';
import { IProduct, IProductManager } from './interface/Product';
import LoadingAnimation from 'ui/LoadingAnimation/LoadingAnimation';
import {  IFoodProductManager } from './ProductManagerVariants/Food/FoodProductManager';
import styled from 'styled-components';
import Icon, { IconName } from 'ui/Icon';
import AddProduct from './AddProductForm/AddProductForm';

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
  const [viewMode, setViewMode] = useState< 'list' | 'tile'>('tile');
  const [optionsList,setOptionsList] = useState(false);
  const [selectedAction, setSelectedAction] = useState<'add' | 'edit'  | 'upload' |  'display'>('display');

  const handleOptionClick = (action: 'add' | 'edit' | 'upload' | 'display') => {
    setTimeout(() => {
      setSelectedAction(action);
      setOptionsList(!optionsList)
    },100)
  }
  
  const handleViewOptionClick = () => {
    setTimeout(() => {
      viewMode === 'list' ? setViewMode('tile') : setViewMode('list');
      setOptionsList(!optionsList)},
      100)
  }

  const handleGoBack = () => {
    setSelectedAction('display');
    setOptionsList(false)
  }

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
      <ControlsWrapper>
        <OptionsWrapper>
        <OptionIcon>
          <Icon name={IconName.Ellipsis} width={1.5} height={1.5} onClick={() => setOptionsList(!optionsList)} />
        </OptionIcon>
        {optionsList && 
          <OptionsList>
            <li onClick={() => handleOptionClick('add')}>Add Product</li>
            <li onClick={() => handleOptionClick('edit')}>Edit</li>
            {viewMode === 'list' ?
            <li onClick={() => handleViewOptionClick()}>Tile View</li>  :
            <li onClick={() => handleViewOptionClick()}>List View</li>
          }
          <li onClick={() => handleOptionClick('upload')}>Upload</li>
          </OptionsList>
        }
        </OptionsWrapper>
      </ControlsWrapper>
      {selectedAction === 'display' && <Manager products={products} />}
      {selectedAction === 'add' && <AddProduct shopType={shopType} backClick={handleGoBack}/>}
    </ProductMangerWrapper>)
};

export const ProductMangerWrapper = styled.div`
    height: 100%;
`;
export const ControlsWrapper = styled.div`
  width: 100%;
`;
export const OptionIcon = styled.div`
  
`;
export const OptionsWrapper = styled.div`
   right: 8px;
    top: -3rem;
    align-items: end;
    display: flex;
    flex-direction: column;
    z-index: 200;
    position: absolute;
    width: 70%;
`;
export const OptionsList = styled.ul`
  margin-right: 0.75rem;
  margin-top: 0.5rem;
  border-radius: 8px;
  padding: 1rem 0;
  width: 100%;
  background: white;
  box-shadow: ${({theme}) => theme.shadow.boxShadowSecondary};
  box-shadow: ${({theme}) => theme.neutralColor.border};
  li {
    padding: 0.5rem;
    transition: background-color 0.3s ease;

    &:hover,
    &:active {
      background-color: lightgray;
    }
  }

`
export default ProductManagerHost;
