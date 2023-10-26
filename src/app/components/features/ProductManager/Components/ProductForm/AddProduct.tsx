import { EShop } from 'app/enums';
import { IProduct } from 'app/interfaces';
import { generateTimestampId } from 'firebaseServices/Utils';
import React, { lazy, Suspense } from 'react';
import { useTheme } from 'styled-components';
import Icon, { IconName } from 'ui/Icon';
import { LoadingAnimation } from 'ui/LoadingAnimation';
import { Box, Col, Row,Text } from 'ui/basic';

const Food = lazy(() => import('../../shops/Food/FormFood'));

interface IAddProduct {
  shop: EShop,
  products: IProduct[],
  onAddProduct:  (item: IProduct, additionalData: any) => void;
  onClose: () => void;
}
const AddProduct: React.FC<IAddProduct> = ({ shop ,onClose, products,onAddProduct}) => {
  const theme = useTheme();
  let Form: React.ComponentType<any> | null = null;
  const Error = () => <div>Shop Does'nt have valid Add Product Form...</div>;
  switch (shop) {
    case EShop.Food:
      Form = Food;
      break;
    default:
      break;
  }
  const addProductMiddleware = (item: IProduct, additionalData: any) => {
    const timestampId = generateTimestampId();
    const newItem: IProduct = {
        ...item,
        id: timestampId,
    };
    onAddProduct(newItem, additionalData);
};
  return (
    <Col  style={{ background: '#fff',borderRadius:'1rem 1rem 0 0'}} h='100%'>
      <Row a='center' j='between' style={{borderBottom:'1px solid ' + theme.neutralColor.border}} p={'1rem 1rem'}>
       <Text  s='16' w={6} c={ theme.neutralColor.text} > Add Product</Text>
        <Icon height={1.2} width={1.2} name={IconName.Close} color='#bd1414' onClick={() => onClose()}/>
      </Row >
      {Form ? (
        <Suspense fallback={<LoadingAnimation/>}>
            <Box p={'1rem 1.4rem'} h='100%'style={{ overflow: 'scroll',  }}>
              <Form  products={products} onSubmit={addProductMiddleware}/>
            </Box>
            </Suspense>)
        :
          (<Error/>
        )
        }
    </Col>
  );
};


export default AddProduct;
