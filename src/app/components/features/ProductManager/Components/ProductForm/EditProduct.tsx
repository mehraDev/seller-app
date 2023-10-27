import { IProduct } from 'app/interfaces';
import React, { lazy, Suspense } from 'react';
import { useTheme } from 'styled-components';
import Icon, { IconName } from 'ui/Icon';
import { LoadingAnimation } from 'ui/LoadingAnimation';
import { Box, Col, Row,Text } from 'ui/basic';

const Food = lazy(() => import('../../shops/Food/FormFood'));

export interface IEditProduct {
  activeEditProduct?: IProduct | null,
  products: IProduct[],
  shop: string,
  onClose: () => void,
  onSave:  (item: IProduct, additionalData: any) => void;
}

const EditProduct: React.FC<IEditProduct> = ({ shop ,onClose, products,onSave, activeEditProduct}) => {
  const theme = useTheme();
  let Form: React.ComponentType<any> | null = null;
  const Error = () => <div>Shop Does'nt have valid Add Product Form...</div>;
  switch (shop) {
    case 'food':
      Form = Food;
      break;
    default:
      break;
  }
  const handleSaveProduct = (item: IProduct, additionalData: any) => {
    onSave(item, additionalData);
};
  return (
    <Col  style={{ background: '#fff',boxShadow: theme.shadow.boxShadow,borderRadius:'1rem 1rem 0 0'}} h='100%'>
      <Row a='center' j='between' style={{borderBottom:'1px solid ' + theme.neutralColor.border}} p={'1rem 1rem'}>
       <Text  s='16' w={7} c={ theme.neutralColor.text} >Edit Product</Text>
        <Icon height={1.2} width={1.2} name={IconName.Close} onClick={onClose}/>
      </Row >
      {Form ? (
        <Suspense fallback={<LoadingAnimation/>}>
            <Box p={'1rem 1rem 2rem'} h='100%' style={{overflowY:'scroll'}}>
              <Form  products={products} onSubmit={handleSaveProduct} editProduct={activeEditProduct}/>
            </Box>
            </Suspense>)
        :
          (<Error/>
        )
        }
    </Col>
  );
};


export default EditProduct;
