import React, { useState, useEffect } from 'react';
import LoadingAnimation from 'ui/LoadingAnimation/LoadingAnimation';
import styled, { useTheme } from 'styled-components';
import {  uploadMenu } from './services';
import { IProduct } from 'app/interfaces';
import { useOptionsButton } from 'app/components/Dashboard';
import { OptionsCard } from 'ui/OptionsCard';
import ProductsEditor from './Components/ProductsEditor';
import ProductsViewer from './Components/ProductsViewer/ProductsViewer';
import { EShop } from 'app/enums';
import { Action } from './Components/ProductsEditor/ProductsEditor';
import Icon, { IconName } from 'ui/Icon';
import { IAllProducts } from './services/uploadMenu';
import { Drawer } from 'ui/Drawer';
import { Row } from 'ui/basic';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

enum Mode {
  Viewer = 'viewer',
  Editor = 'edit'
}


const ProductManager: React.FC = () => {
  const theme = useTheme();
  const shop: EShop = EShop.Food;
  const {setDisplayOptions,displayOptions,setHasOptionButton} = useOptionsButton();

  const [mode, setMode] = useState<Mode>(Mode.Viewer);
  const { list: products, isLoading } = useSelector(
    (state: RootState) => state.products
  );
 
  const handleInitialAddProduct = () => {
    setMode(Mode.Editor);
  }
  const handleUploadProducts = async (uploadData: IAllProducts) => {
    try {
      return await uploadMenu(uploadData);
    } catch (error) {
      throw(error);
    }
  };
  
  useEffect(() => {
    setHasOptionButton(true);
    return () => {
      setHasOptionButton(false);
    };

  }, [ setHasOptionButton]);

if (isLoading) {
    return <LoadingAnimation/>
  }
  
  const options = [
    { label: !products.length ? 'Add Products' : 'Edit Products', onClick : handleInitialAddProduct  }
  ];

  const displayAddProductFormInitially = !products.length;
  
  return (
    <>
      <ProductsViewer shop={EShop.Food}/>
          <Row w='initial' style={{
              background: theme.brandColor.primary,
              boxShadow:theme.shadow.shadow1,
              position:'absolute', bottom:'1rem',right:'1rem'

            }}
            br='12px'>
          <Icon name={IconName.Edit} 
            clickEffectTime={100}
            onClick={() => setMode(Mode.Editor)}
             padding='1rem'
            color={theme.neutralColor.bgContainer}
            height={1.5}
            br='12px'
            width={1.5}
          />
          </Row>
          <Drawer isOpen={mode === Mode.Editor} h='100%' >
            <ProductsEditor
              onUpload={handleUploadProducts}
              initialMode={displayAddProductFormInitially ? Action.Add : Action.None }
              initialProducts={products}
              onClose={() => setMode(Mode.Viewer)}
              shop={shop}
              />
        </Drawer>
      {displayOptions &&
        <OptionsCard options={options} closeCard={() => setDisplayOptions(false)}/>
      }
    </>
  );
};

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
    z-index: 3;
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
export default ProductManager;
