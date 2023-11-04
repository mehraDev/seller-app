import { IProduct } from "app/interfaces";
import Icon, { IconName } from "ui/Icon";
import {  Col, ICol, Row } from "ui/basic";

interface ICardWithControlsProps extends ICol {
    item: IProduct;
    onEdit?: (product: IProduct) => void;
    onDelete?: (product: IProduct) => void;
    children: React.ReactNode;
    isValid?: boolean
    showValidation?:boolean
}

const CardWithControls: React.FC<ICardWithControlsProps> = ({p, br, item, onEdit, onDelete, children,isValid,showValidation }) => {

    const borderColor = showValidation && isValid ? '' : 'red';
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
        <Col style={{border:'1px solid ' + borderColor,borderRadius:br}} p={p}>
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