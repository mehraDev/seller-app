import React, { useState, useEffect } from 'react';
import LoadingAnimation from 'ui/LoadingAnimation/LoadingAnimation';
import styled from 'styled-components';
import Viewer from './Viewer';
import AddProduct from './Form/AddProduct';
import { getProducts } from './services';
import OptionsButton from 'ui/MobileHeader/OptionsButton';
import { IProduct } from 'app/interfaces';
import { Box, Col } from 'ui/basic';
import WelcomeCard from './WelcomeCard';
import { Backdrop } from 'ui/Backdrop';

const ProductManager: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAddMode,setIsAddMode] = useState(false);
  const [isUploadMode,setIsUploadMode] = useState(false);

  const [, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [viewMode, setViewMode] = useState< 'list' | 'tile'>('tile');
  const [screen, setScreen] = useState<'add' | 'edit'  | 'upload' |  'viewer'>('viewer');
  
  const actions: ("add" | "edit" | "upload" | "viewer")[] = ['add', 'edit', 'upload', 'viewer'];

  const handleOptionClick = (optionIndex: number) => {
    setTimeout(() => {
      const action = actions[optionIndex];
      setScreen(action);
    }, 100);
  };

  const handleGoBack = () => {
    setScreen('viewer');
  }

  const openAddFormScreen = () => {
    setScreen('add');
  }

  const openUploadScreen = () => {
    setScreen('upload');
  }

  useEffect(() => {
    const loadFeatureData = async (): Promise<void> => {
      try {
        const response = await getProducts();
        setProducts(response);
        setIsLoading(false);
      } catch (error: any) {
        console.log(error)
        setError(error.message);
        setIsLoading(false);
      }
    };
    loadFeatureData();
  }, []);
  const options = [
    <div>Add Product</div>,
    <div >Edit</div>,
    <div>
      {viewMode === 'list' ? 'Tile View' : 'List View'}
    </div>,
    <div>Upload</div>,
  ];
  
if (isLoading) {
    return <LoadingAnimation/>
  }
    
  return (
    <Col>
      {/* <ControlsWrapper>
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
      </ControlsWrapper> */}
      <OptionsButton optionsList={options} onOptionClick={handleOptionClick} />
     { products.length ? 
      <Viewer products={products} shop={'food'}/> :
      <WelcomeCard onAddProductClick={() => setIsAddMode(true)} onUploadFromFileClick={() => setIsUploadMode(true)}/>
     }
     {isAddMode && 
  <Backdrop >
      <Box a='center' j='center' h="100%">
        <AddProduct shop={'food'} onClose={() => setIsAddMode(false) } />
      </Box>
  </Backdrop>
}
       
    </Col>
  )

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
