import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import Icon, { IconName } from 'ui/Icon';

const FoodAddItemForm = lazy(() => import('./Food/FoodAddProductForm'));

interface IAddProduct {
  shopType: string,
  backClick: () => void
}
const AddProduct: React.FC<IAddProduct> = ({ shopType ,backClick}) => {
  let ProductFormComponent: React.ComponentType<any> | null = null;
  
  switch (shopType) {
    case 'food':
      ProductFormComponent = FoodAddItemForm;
      break;
    // Add other cases for different shop types if needed
    default:
      break;
  }

  return (
    <AddProductWrapper>
      <Row>
        <Icon name={IconName.GoBack} onClick={backClick}/>
        <h3>Add Product</h3>
      </Row>
      {ProductFormComponent ? (
        <Suspense fallback={<div>Loading...</div>}>
          <ProductFormComponent />
        </Suspense>
      ) : (
        <div>Shop type not supported</div>
      )}
    </AddProductWrapper>
  );
};

const AddProductWrapper = styled.div`
  color: ${({theme }) => theme.neutralColor.text};
`;

const Row = styled.div`
  margin-bottom: 0.5rem;
  padding: 1rem;
  font-size: large;
  display: flex;
  flex-direction: row;
  font-weight: 700;
  align-items: center;
  border-bottom: 1px solid ${({theme }) => theme.neutralColor.border};
  color: ${({theme }) => theme.brandColor.primaryActive};
  div{
    margin-right: 1rem;
  }
  h3 {
    flex-grow: 1;
    text-align: center;
    margin-right: 2rem;
  }
`;

export default AddProduct;
