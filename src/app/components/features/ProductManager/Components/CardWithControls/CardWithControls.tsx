import { IProduct } from "app/interfaces";
import Icon, { IconName } from "ui/Icon";
import {  Col, Row } from "ui/basic";

interface ICardWithControlsProps {
    item: IProduct;
    onEdit?: (product: IProduct) => void;
    onDelete?: (product: IProduct) => void;
    children: React.ReactNode;
}

const CardWithControls: React.FC<ICardWithControlsProps> = ({ item, onEdit, onDelete, children }) => {
    const editColor = 'rgb(0 86 227)';
    const deleteColor = 'rgb(191 18 18)';
    const handleEdit = ( ) => {
       if(onEdit){
        onEdit(item)
       }

    }
    const handleDelete = ( ) => {
        if(onDelete){
            onDelete(item)
           }
    }
    return (
        <Col>
            {children}
            <Row style={{gap: '0.5rem'}} a="center" j='end' p='0.5rem 1rem'>
                <Icon 
                    name={IconName.Edit} 
                    color={editColor} 
                    onClick={handleEdit}
                />
                <Icon 
                    name={IconName.Delete} 
                    color={deleteColor} 
                    onClick={handleDelete}
                />
            </Row>
        </Col>
    );
};
export default  CardWithControls;