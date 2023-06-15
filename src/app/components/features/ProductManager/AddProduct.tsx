import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import Icon, { IconName } from 'ui/Icon';
import { PanelHeader } from 'ui/headers';

const Food = lazy(() => import('./shops/Food/FormAddProduct'));

interface IAddProduct {
  shop: string,
  onClose: () => void
}
const AddProduct: React.FC<IAddProduct> = ({ shop ,onClose}) => {
  let Form: React.ComponentType<any> | null = null;
  const Loading = () => <div>Loading...</div>;
  const Error = () => <div>Shop Does'nt have Add Product Form...</div>;

  switch (shop) {
    case 'food':
      Form = Food;
      break;
    default:
      break;
  }

  return (
    <StyledWrapper>
      <PanelHeader>
        <Icon name={IconName.GoBack} onClick={onClose}/>
        <h3>Add Product</h3>
      </PanelHeader>
      {Form ? (<Suspense fallback={<Loading/>}>
          <Form />
        </Suspense>)
        :(<Error/>)
        }
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  color: ${({theme }) => theme.neutralColor.text};
`;


export default AddProduct;
