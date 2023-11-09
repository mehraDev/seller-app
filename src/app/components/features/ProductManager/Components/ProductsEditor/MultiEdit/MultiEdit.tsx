import {  Col, Row ,Text} from "ui/basic";
import { IItemCard } from "../../ProductsCard/supportedProductCards";
import { useTheme } from "styled-components";
import Icon, { IconName } from "ui/Icon";
import { IProduct } from "app/interfaces";
import CardWithControls from "../../CardWithControls/CardWithControls";
import Button from "ui/Button";
import { IEditProduct } from "../../ProductForm/EditProduct";
import { useCallback, useEffect, useState } from "react";
import { Drawer } from "ui/Drawer";

interface IMultiUpload {
    newProducts: IProduct[];
    prevProducts: IProduct[];
    ProductCard: React.FC<IItemCard>;
    onClose : () => void;
    onSave : (items: IProduct[]) => void;
    Editor: React.FC<IEditProduct>;
    validator: (item:IProduct ,allItems: IProduct[]) =>  Promise<boolean>;
}
const MultiEdit: React.FC<IMultiUpload> = ({ newProducts, ProductCard,onClose,onSave,Editor,validator,prevProducts }) => {
    const theme = useTheme();

    const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
    const [activeItems, setActiveItems] = useState<IProduct[]>(newProducts);
    const handleCloseEditor = useCallback(() => onClose(), [onClose]);
    
    const [productValidities, setProductValidities] = useState<boolean[]>([]);
    useEffect(() => {
        const validateProducts = async () => {
            let validityArray: boolean[] = [];
            for (let product of activeItems) {
                const isValid = await validator(product, prevProducts);
                validityArray.push(isValid);
            }
            setProductValidities(validityArray);
        };
        validateProducts();
    }, [activeItems, prevProducts, validator]);
      

    const handleEdit = (product: IProduct) => {
        setEditingProduct(product);
    };

   

    const handleEditSave = async (editedItem: IProduct) => {
        setActiveItems(prevItems => 
                    prevItems.map(item => 
                        item.id === editedItem.id ? editedItem : item
                    )
                );
       
        setEditingProduct(null);
      };
    


    const handleEditClose = () => {
        setEditingProduct(null);
    };

    const handleRemove = (product:IProduct) => {
        setActiveItems(prevItems => prevItems.filter(item => item.id !== product.id));
    }

    const handleSave = () => {
        if (productValidities.length) {
            onSave(activeItems);
        }
    };
    const isSubmitEnabled  = productValidities.every(isValid => isValid);
    return (
        <Col style={{background: theme.neutralColor.bgContainer}} h="100%">
            <Row a="center" w="inherit" p=' 0.5rem' style={{background:'yellow'}}>
                <Row a='center' j="between">
                    <Text w={7} s='18'  ml="0.5rem" c={theme.neutralColor.text}>Multi Upload</Text>
                    <Icon height={1.5} color={theme.brandColor.red} width={1.5} name={IconName.Close} onClick={handleCloseEditor} />
                </Row>
            </Row>
            <Col style={{overflow:'scroll'}} h="100%" p={'0 0 10rem'}>
                {activeItems.map((item, index) => (
                    <Row p={'0.5rem'} key={index}>
                        <CardWithControls p={'1rem 0.5rem'} br="8px" isValid={productValidities[index]} showValidation={true} item={item} onEdit={handleEdit} onDelete={() => handleRemove(item)} >
                        <ProductCard  item={item} showCategory={true}/>
                    </CardWithControls>
                    </Row>
                ))}
            </Col>
            <Row a="center" j="center" p='1rem' style={{gap:'1rem',position:'absolute',bottom: '0',borderTop: '1px solid '+ theme.neutralColor.border,background:theme.neutralColor.bgContainer}}>
                <Button width="80%" onClick={handleSave} disabled={!isSubmitEnabled}>
                    Done
                </Button>
            </Row>
            <Drawer isOpen={ editingProduct !== null}>
            <Editor 
                shop="food" 
                activeEditProduct={editingProduct}
                products={prevProducts}
                onClose={handleEditClose} 
                onSave={handleEditSave}
                />
            </Drawer>
        </Col>
       
    );
};
export default MultiEdit