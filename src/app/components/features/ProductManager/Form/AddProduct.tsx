import React, { lazy, Suspense } from 'react';
import styled, { useTheme } from 'styled-components';
import Icon, { IconName } from 'ui/Icon';
import { Row,Text } from 'ui/basic';

const Food = lazy(() => import('../shops/Food/Form'));

interface IAddProduct {
  shop: string,
  onClose: () => void
}
const AddProduct: React.FC<IAddProduct> = ({ shop ,onClose}) => {
  const theme = useTheme();
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
    <Wrapper>
      <Row a='center' j='between' style={{color: theme.brandColor.primary}} m={'0 0 1rem'}>
       <Text  s='16' tt='upp' w={6}> Add Product</Text>
        <Icon height={1.2} width={1.2} name={IconName.Close} onClick={() => onClose()}/>
      </Row >
      {Form ? (<Suspense fallback={<Loading/>}>
          <Form />
        </Suspense>)
        :(<Error/>)
        }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: ${({theme }) => theme.neutralColor.textSecondary};
  margin: 1rem;
  height: 90%;
  border-radius: 6px;
  padding: 2rem 1.5rem;
  width: 80%;
  background: white;
  box-shadow: 0 0px 4px rgba(0, 0, 0, 0.2); /* Adjust the shadow values to your preference */
`;

export default AddProduct;
