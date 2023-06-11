import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import Icon, { IconName } from 'ui/Icon';

const FoodAddItemForm = lazy(() => import('./Food/FoodAddItemForm'));

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
  align-items: center;
  font-weight: 600;
  border-bottom: 1px solid ${({theme }) => theme.neutralColor.border};

  h3{
    margin-left: 1rem;
  }
`;

export default AddProduct;
