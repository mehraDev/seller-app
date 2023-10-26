import {  Col, Row ,Text} from "ui/basic";
import { IItemCard } from "../../ProductsCard/supportedProductCards";
import { useTheme } from "styled-components";
import Icon, { IconName } from "ui/Icon";
import { IProduct } from "app/interfaces";
import CardWithControls from "../../CardWithControls/CardWithControls";
import Button from "ui/Button";
import { IEditProduct } from "../../ProductForm/EditProduct";
import { useState } from "react";
import { Drawer } from "ui/Drawer";

interface IMultiEdit {
    items: IProduct[];
    prevItems: IProduct[];
    CardComponent: React.FC<IItemCard>;
    onClose : () => void;
    onSave : (items: IProduct[]) => void;
    EditComponent: React.FC<IEditProduct>;
    allItemsValid: (items: IProduct[]) => boolean;
}
const MultiEdit: React.FC<IMultiEdit> = ({ items, CardComponent,onClose,onSave,EditComponent,allItemsValid,prevItems }) => {
    const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
    const [activeItems, setActiveItems] = useState<any[]>(items);
    const handleCloseEditor = () =>{
        onClose()
    }
    const theme = useTheme();

    const handleEdit = (product:IProduct) => {
        setEditingProduct(product);
    }
    const handleEditSave = (editedItem: IProduct) => {
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
        if (allItemsValid(activeItems)) {
            onSave(activeItems);
        } else {
            console.error("Some items are not valid.");
        }
    };
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
                    <CardWithControls item={item} onEdit={handleEdit} onDelete={() => handleRemove(item)}>
                        <CardComponent key={index} item={item} showCategory={true}/>
                    </CardWithControls>
                ))}
            </Col>
            <Row a="center" j="center" p='1rem' style={{gap:'1rem',position:'absolute',bottom: '0',borderTop: '1px solid '+ theme.neutralColor.border,background:theme.neutralColor.bgContainer}}>
                <Button width="80%" onClick={handleSave} disabled={!allItemsValid(activeItems)}>
                    Done
                </Button>
            </Row>
            <Drawer isOpen={ editingProduct !== null}>
            <EditComponent 
                shop="food" 
                activeEditProduct={editingProduct}
                products={prevItems}
                onClose={handleEditClose} 
                onSave={handleEditSave}
                />
            </Drawer>
        </Col>
       
    );
};
export default MultiEdit