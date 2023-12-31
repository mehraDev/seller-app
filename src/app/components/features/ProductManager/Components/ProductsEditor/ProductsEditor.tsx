import { IProduct } from "app/interfaces";
import {  Col, Row,Text } from "ui/basic";
import Icon, { IconName } from "ui/Icon";
import { useTheme } from "styled-components";
import Button from "ui/Button";
import { Drawer } from "ui/Drawer";
import AddProduct from "../ProductForm/AddProduct";
import {  useState } from "react";
import { EShop } from "app/enums";
import { Backdrop } from "ui/Backdrop";
import EmptyProductsCard from "../EmptyProductsCard";
import EditProduct from "../ProductForm/EditProduct";
import { deepEqual } from "utils";
import { addImageUrlsToProducts } from "../../services";
import DrawerPreviewProduct from "../DrawerPreviewProduct/DrawerPreviewProduct";
import supportedProductCards from "../ProductsCard";
import { IItemCard } from "../ProductsCard/supportedProductCards";
import { LoadingAnimation } from "ui/LoadingAnimation";
import ProductListEditable from "./ProductsListEditable/ProductsListEditable";
import { PopupStatus } from "ui/Popup";

import { IAllProducts } from "../../services/uploadMenu";
import { InputFile } from "ui/Form";
import { EPopupModes } from "ui/Popup/PopupStatus";
import InputSearch from "ui/Form/Inputs/InputSearch";
import PopupWarning from "ui/Popup/PopupWarning";
import {  generateUniqueTimestampId } from "firebaseServices/Utils/UniqueID";
import { fetchProducts } from "store/modules/productSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store/store";
import MultiEdit from "./MultiEdit/MultiEdit";
import { isProductValid } from "../../utils/validators/isProductValid";
import convertHEICToWebp from "ui/Image/utils/imageConversion";
import Toolbar from "./Toolbar/Toolbar";

export interface IProductsEditor {
    initialProducts: IProduct[];
    onClose: () => void
    shop: EShop;
    initialMode? : Action;
    onUpload : (uploadData: IAllProducts) => Promise<boolean>
}

export enum Action{
    Add = 'add',
    Edit = 'edit',
    Delete = 'delete',
    None = 'none'
}
export enum ELists{
  New = 'New',
  Unmodified = 'Unchanged',
  Modified = 'Modified',
  Deleted = 'Deleted'
}

const ProductsEditor : React.FC<IProductsEditor>= ({onClose,onUpload,shop,initialMode = Action.None,initialProducts}) => {
    const absoluteImageProducts: IProduct[] = addImageUrlsToProducts(initialProducts,shop);
    const [action,setAction] = useState<Action>(initialMode);
    const [preview,setPreview] = useState<IProduct | null>(null)
    const [loading, setLoading] = useState(false);

    const [unModifiedProducts,setUnmodifiedProducts] = useState<IProduct[]>(absoluteImageProducts);
    const [newProducts,setNewProducts] = useState<IProduct[]>([]);
    const [modifiedProducts,setModifiedProducts] = useState<IProduct[]>([]);
    const [deletedProducts,setDeletedProducts] = useState<IProduct[]>([]);
    const [importedProducts,setImportedProducts] = useState<IProduct[]>([]);

    const [uploadStatus, setUploadStatus] = useState<'success' | 'error' | 'none'>('none');
    const [activeProduct,setActiveProduct] = useState<IProduct | null>(null);
    const [activeList,setActiveList] = useState<ELists | null>(null);
    const [query,setQuery] = useState('');
    const [popupMode , setPopupMode] = useState<EPopupModes>(EPopupModes.None);
    const [popupMessage , setPopupMessage] = useState('');
    const [resetPopup,setResetPopup] = useState(false);
    const [closeEditorPopup,setCloseEditorPopup] = useState(false);

    const [isUploading,setIsUploading] = useState(false);
    const [multiEditProducts, setMultiEditProducts] = useState<IProduct[]>([]);
    const [showMultiEdit, setShowMultiEdit] = useState<boolean>(false);
    const hasChanges = newProducts.length || modifiedProducts.length || deletedProducts.length ;
    const theme = useTheme();

    const onCloseEditor = () => {
      onClose();
    }
    const handleCloseEditor = () => {
      if(hasChanges){
        setCloseEditorPopup(true)
      }
      else onCloseEditor();
    }

    const handleAddNewItem = (product:IProduct | IProduct) => {
        setNewProducts(
          prevItems => 
          [product,...prevItems]);
        if(action !== Action.None){
          setAction(Action.None)
        }
    }

    const handleMultiEditSave = (products: IProduct[]) => {
      setNewProducts(prevItems => [...products, ...prevItems]);
      setShowMultiEdit(false);
      setMultiEditProducts([])
  }
 const handleMultiEditClose = () => {
    setShowMultiEdit(false);
    setMultiEditProducts([])
}
    const handleEditProductSave = (product:IProduct) => {
      switch (activeList) {
          case ELists.Unmodified:
                if (!deepEqual(product, unModifiedProducts.find(p => p.id === product.id))) {
                   const updatedUnmodifiedList = unModifiedProducts.filter(p => p.id !== product.id);
                   const  updatedModifiedProducts = [product, ...modifiedProducts];
                   setModifiedProducts(updatedModifiedProducts);
                   setUnmodifiedProducts(updatedUnmodifiedList);
                }
          break;
          case ELists.Modified:
            if (deepEqual(product, initialProducts.find(p => p.id === product.id))) {
              const updatedUnmodifiedList = [product,...unModifiedProducts];
              const updatedModifiedProducts = modifiedProducts.filter(p => p.id !== product.id);
              setModifiedProducts(updatedModifiedProducts);
              setUnmodifiedProducts(updatedUnmodifiedList);
              } else {
                const updatedModifiedProducts = [product, ...modifiedProducts.filter(p => p.id !== product.id)];
                setModifiedProducts(updatedModifiedProducts);
              }
          break;
            case ELists.New:
                  const updatedNewProducts = [ product , ...newProducts.filter(p => p.id !== product.id)];
                  setNewProducts(updatedNewProducts);
                break;
          default:
            break;
        };
        setActiveList(null);
        setActiveProduct(null)
        setAction(Action.None);
    };

    const handleEditProduct = (product: IProduct,list:ELists) => {
        setAction(Action.Edit);
        setActiveProduct(product)
        setActiveList(list);
    }
    const handleClearProduct = (product: IProduct, list: ELists) => {
        setAction(Action.Delete);
        setActiveProduct(product)
        setActiveList(list);
    };
    const handleClearProductCancel = () => {
        setAction(Action.None);
        setActiveProduct(null)
        setActiveList(null);
    };
    const handleClearProductConfirm = () => {
      if (activeProduct && activeList) {
        switch (activeList) {
          case ELists.New:
            setNewProducts(newProducts.filter((product) => product.id !== activeProduct.id));
            break;
          case ELists.Modified:
            const originalProduct = initialProducts.find((product) => product.id === activeProduct.id);
            setModifiedProducts(modifiedProducts.filter((product) => product.id !== activeProduct.id));
            if (originalProduct) {
              setUnmodifiedProducts([originalProduct,...unModifiedProducts]);
            }
            break;
          case ELists.Unmodified:
            setUnmodifiedProducts(unModifiedProducts.filter((product) => product.id !== activeProduct.id));
            setDeletedProducts([activeProduct,...deletedProducts]);
            break;
          case ELists.Deleted:
            setDeletedProducts(deletedProducts.filter((product) => product.id !== activeProduct.id));
            setUnmodifiedProducts([activeProduct, ...unModifiedProducts]);
            break;
          default:
            break;
        }
        setActiveProduct(null);
        setActiveList(null);
        setAction(Action.None);
      }
    };

    const handleInitialProductAdd = () => {
        setAction(Action.Add);
    }

    const handleCloseEditProduct = () => {
        setAction(Action.None);
        setActiveProduct(null);
        setActiveList(null);
    }
    

    const handleUpdateProducts = async () => {
      setLoading(true);
        try {
            const finalProducts : IAllProducts = {
              newProducts,
              unModifiedProducts,
              modifiedProducts,
              deletedProducts,
              relativeImageProducts : initialProducts,
              absoluteImageProducts,
              importedRelativeImageProducts: importedProducts,
              importedAbsoluteImageProducts: addImageUrlsToProducts(importedProducts,shop)
            }
            await onUpload(finalProducts);
            setUploadStatus('success'); 
        } catch (error) {
          setUploadStatus('error');
          console.log('error',error);
        } finally{
          setLoading(false);
        };
    };

    const handleResetEditorConfirm = () => {
      setNewProducts([]);
      setModifiedProducts([]);
      setDeletedProducts([]);
      setImportedProducts([]);
      setUnmodifiedProducts(absoluteImageProducts);
      setResetPopup(false)
    }

    const handleMultiUpload = async (files: FileList) => {
      setIsUploading(true);

      const readFileAsDataURL = async (file: File): Promise<string> => {
          return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = reject;
              reader.readAsDataURL(file);
          });
      };
      const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
      const convertFile= async (file: File): Promise<File> => {
        try {
          if (file) {
            if (file.type === "image/heic") {
              console.log("Before convertsion from HEIC to Webp: ", (file.size / 1024).toFixed(2), "KB");
              file = await convertHEICToWebp(file);
              console.log("After convertsion from HEIC to Webp: ", (file.size / 1024).toFixed(2), "KB");
            }
            return file;
          }
          return file;
        } catch (error) {
          console.error('Error converting file:', error);
          throw error;
        }
      };
      try {
        const processedFiles = await Promise.all(imageFiles.map(convertFile));
        const loadedImages = await Promise.all(processedFiles.map(readFileAsDataURL));
        const products: IProduct[] = loadedImages.map((image, index) => ({
          id: `${generateUniqueTimestampId()}`,
          name: `P ${index + 1}`,
          price: 0,
          veg:true,
          description: ``,
          image: image
      }));
        if(products.length > 0) {
            setShowMultiEdit(true); 
          setMultiEditProducts(products);
        }
    } catch (error) {
        alert('Error reading file:');
    } finally{
      setIsUploading(false);
    }
    };

    const handleUploadFromFile = (files: FileList) => {
      const file = files[0];
      if (file.name.endsWith('.dbmenu')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target) {
            try {
              const jsonData = JSON.parse(event.target.result as string);
              if (jsonData.hasOwnProperty('products')) {
                const products: IProduct[] = jsonData.products;
                if(products.length){
                  const productsWithIds = products.map((product) => ({ ...product, id: generateUniqueTimestampId() }));
                  setImportedProducts((prevProducts) => [...productsWithIds,...prevProducts]);
                  const importedAbsoluteImageProducts = addImageUrlsToProducts(productsWithIds,shop);
                  setNewProducts([...importedAbsoluteImageProducts,...newProducts]);
                  setPopupMode(EPopupModes.Success);
                  setPopupMessage(`Added ${products.length} products successfully.`);
                }else{
                  setPopupMode(EPopupModes.Error);
                  setPopupMessage('No Products Found');
                }
                
              } else {
                setPopupMode(EPopupModes.Error);
                setPopupMessage('No Products Found');
              }
            } catch (error) {
              console.error('Error parsing JSON data:', error);
            }
          } else {
            console.error('Event target is null.');
          }
        };
        reader.readAsText(file);
      } else {
        setPopupMode(EPopupModes.Error);
        setPopupMessage('Invalid File');
      }
    };
    const handleClosePopup = () => {
      setPopupMode(EPopupModes.None);
      setPopupMessage('');
    }
    const handleSearch = (q:string) => {
      setQuery(q);
    }

    const lists = [
        { listType: ELists.New, products: newProducts, title: "Recently Added", titleColor : theme.neutralColor.text },
        { listType: ELists.Modified, products: modifiedProducts, title: "Updated Products",titleColor : theme.neutralColor.text},
        { listType: ELists.Deleted, products: deletedProducts, title: "Removed Products",titleColor : theme.neutralColor.text},
        { listType: ELists.Unmodified, products: unModifiedProducts, title: "Existing Products",titleColor : theme.neutralColor.text }
      ];

      const filteredLists = lists.map(list => {
        return {
          ...list,
          products: list.products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()))
        };
      });
      const emptySearch = filteredLists.every(list => list.products.length < 1 );
  const getConfirmationTitleForProductRemoval = () => {
    if (activeProduct) {
      switch (activeList) {
        case ELists.New:
          return `Remove "${activeProduct.name}"?`;
        case ELists.Modified:
          return `Discard Changes?`;
        case ELists.Unmodified:
          return `Delete "${activeProduct.name}"?`;
        case ELists.Deleted:
          return `Restore "${activeProduct.name}"?`;
        default:
          return '';
      }
    }
    return '';
  };
  
  const getConfirmationMessageForProductRemoval = () => {
    if (activeProduct) {
      switch (activeList) {
        case ELists.New:
          return `Are you sure you want to remove "${activeProduct.name}" from the New Products?`;
        case ELists.Modified:
          return `Are you sure you want to discard changes to "${activeProduct.name}"?`;
        case ELists.Unmodified:
          return `Are you sure you want to delete "${activeProduct.name}" ?`;
        case ELists.Deleted:
          return `Are you sure you want to restore "${activeProduct.name}" ?`;
        default:
          return '';
      }
    }
    return '';
  };

  const dispatch = useDispatch<AppDispatch>();

  const handleCloseUploadStatusPopup = () => {
    if(uploadStatus === 'success'){
      dispatch(fetchProducts());
      onClose();
    }
    setUploadStatus('none');
  }
  const ActiveAction =  (action === Action.Add
                          ? 
                            <AddProduct shop={shop} onClose={() => setAction(Action.None) }
                            products={[...newProducts,...unModifiedProducts,...modifiedProducts]}
                            onAddProduct={handleAddNewItem}/>
                          :
                          action === Action.Edit
                          ?
                            <EditProduct
                            onSave={handleEditProductSave}
                            activeEditProduct={activeProduct}
                            shop={shop}
                            onClose={handleCloseEditProduct }
                            products={[...newProducts,...unModifiedProducts,...modifiedProducts]}/>
                          :
                          null
      );

  const noProducts = !newProducts.length &&  !unModifiedProducts.length && !modifiedProducts.length && !deletedProducts.length;
  let ProductCard = supportedProductCards[shop] as React.FC<IItemCard>;
  let EditComponent =  EditProduct;
  
  // const validateProduct = async (products: IProduct[]): Promise<boolean> => {
  //     const allProducts = [...newProducts, ...unModifiedProducts, ...modifiedProducts];
  //     const isValid = await isProductValid(allProducts, product, shop);
  //   return isValid;
  // };
  const validateProductForShop = async (
    product: IProduct, 
    allProducts: IProduct[]
): Promise<boolean> => {
    return isProductValid(product, allProducts, shop);
  };

  return (
    <Col h="100%" style={{background:theme.neutralColor.bgContainer,borderBottom: `1px solid ${theme.neutralColor.borderSecondary}`}}>
      <Col style={{boxShadow:theme.shadow.shadow1, background: theme.neutralColor.bgContainer,borderBottom: `1px solid ${theme.neutralColor.borderSecondary}`}}>
        <Row  a="center" w="inherit" p='0.5rem' style={{borderBottom: `1px solid ${theme.neutralColor.border}`}} >
              <Icon height={1.2} color={theme.neutralColor.text} width={1.2} name={IconName.GoBack} onClick={handleCloseEditor} />
              <Text w={7} s='16'  ml="0.5rem" c={theme.neutralColor.text}>Products Editor</Text>           
        </Row>
        <Toolbar onAddItem={function (): void {
          throw new Error("Function not implemented.");
        } } onUploadImages={function (files: FileList | null): void {
          throw new Error("Function not implemented.");
        } } onImportItems={function (files: FileList | null): void {
          throw new Error("Function not implemented.");
        } }/>
      </Col>

      <Col h="100%" style={{overflow:'scroll'}}>
      <Col  p="1rem 0.5rem 12rem"
        style={{
          background: theme.neutralColor.bgLayout,
          gap:'1rem'
        }}>
          { noProducts ?
            <EmptyProductsCard onAddProductClick={handleInitialProductAdd}/> :
              <>
              {!emptySearch ? filteredLists.map(({ listType, products, title, titleColor = '' }) => (
                  <ProductListEditable
                    handleClearProduct={handleClearProduct}
                    handleEditProduct={ handleEditProduct}
                    key={`${listType} ${query}`}
                    listType={listType}
                    products={products}
                    shop={shop}
                    listTitle={title}
                    titleColor={titleColor}
                  />
                ))
                :
                <Row a='center' j="center"  p={'2rem 1rem'}><Text c={theme.neutralColor.textSecondary} s='14' w={5}>No Produts Found</Text></Row>
              }
                </>
            }
        </Col>
       </Col>
      <Row a="center" j="between" p='1rem' style={{gap:'1rem',position:'absolute',bottom: '0',borderTop: '1px solid '+ theme.neutralColor.border,background:theme.neutralColor.bgContainer}}>
                <Button padding="0.75rem" size="medium" onClick={() => setAction(Action.Add)} width="50%">Add Product</Button>
                <Button  padding="0.75rem" size="medium" disabled={!hasChanges} width="50%" onClick={handleUpdateProducts}>Update</Button>
      </Row> 
          <Drawer isOpen={action === Action.Add || action === Action.Edit}>
            {ActiveAction}
          </Drawer>
          <Drawer isOpen={showMultiEdit ? true : false}  h="100%">
          {showMultiEdit && 
            <MultiEdit 
              prevProducts={[...newProducts,...unModifiedProducts,...modifiedProducts]}
              validator={validateProductForShop}
              onSave={handleMultiEditSave}
              newProducts={multiEditProducts}
              ProductCard={ProductCard}
              onClose={handleMultiEditClose}
              Editor={EditComponent}
            />
          }
          </Drawer>
          <DrawerPreviewProduct isOpen={preview ? true : false} onClose={() => setPreview(null)}>
            {preview && <ProductCard item={preview} mode="p"/>}
          </DrawerPreviewProduct>
          <PopupWarning
            show={action === Action.Delete}
            title={getConfirmationTitleForProductRemoval()}  message={getConfirmationMessageForProductRemoval()}
            onCancel={handleClearProductCancel}
            onConfirm={handleClearProductConfirm} />
          <PopupWarning
            show={resetPopup}
            title={'Reset all ?'}  message={`Are you sure you want to discard all changes?`}
            onCancel={() => setResetPopup(false)}
            onConfirm={handleResetEditorConfirm} />
          <PopupWarning
            show={closeEditorPopup}
            title={'Discard Unsaved Changes?'}  message={`You have unsaved changes. Are you sure you want to close the editor and discard all changes?`}
            onCancel={() => setCloseEditorPopup(false)}
            onConfirm={onCloseEditor} />
        {loading && (
        <Backdrop>
          <LoadingAnimation/>
        </Backdrop>
        )}
         {isUploading && (
        <Backdrop>
          <LoadingAnimation/>
        </Backdrop>
        )}
        <PopupStatus mode={popupMode} onClose={handleClosePopup} message={popupMessage}/>
        <PopupStatus
          mode={uploadStatus !== 'none' ? uploadStatus === 'success' ? EPopupModes.Success : EPopupModes.Error : EPopupModes.None}
          onClose={handleCloseUploadStatusPopup}
          message={uploadStatus === 'success' ? `Products added successfully.` : `Something went wrong.`}/>
    </Col>
    )
  };

 

  export default ProductsEditor;



