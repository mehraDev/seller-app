import { EShop } from "app/enums";
import { IProduct } from "app/interfaces";
import { ELists } from "../ProductsEditor";
import { useTheme } from "styled-components";
import { Col, Row,Text } from "ui/basic";
import supportedProductCards from "../../ProductsCard";
import Icon, { IconName } from "ui/Icon";
import { IItemCard } from "../../ProductsCard/supportedProductCards";
import { useState } from "react";

interface ICardControl {
    product: IProduct
  }
  
interface IProductListEditable {
    handleClearProduct: (product: IProduct,list:ELists) => void;
    handleEditProduct: (product: IProduct,list:ELists) => void;
    products: IProduct[];
    shop: EShop;
    listTitle: string;
    listType: ELists;
    titleColor?: string
  }
  const ProductListEditable: React.FC<IProductListEditable> = ({
    handleClearProduct,
    handleEditProduct,
    products, shop, listTitle,
    listType,
    titleColor
  }) => {
    
    const [isExpanded,setIsExpanded] = useState(true);
    const theme = useTheme();
    const EListsColors = {
      [ELists.New]: '#34D399',
      [ELists.Unmodified]: '#fff',
      [ELists.Modified]: '#FFA500',
      [ELists.Deleted]: '#FF3B30',
    };
    let ProductCard = supportedProductCards[shop] as React.FC<IItemCard>;
    
    const CardControl: React.FC<ICardControl> = ({ product }) => {
      let controlsComponent: React.ReactNode = null;
      const editColor = 'rgb(0 86 227)';
      const deleteColor = 'rgb(191 18 18)';
      const recoverColor = 'rgb(238 148 0)';
    
      switch (listType) {
        case ELists.New:
          controlsComponent = (
            <>
              <Icon name={IconName.Edit} color={editColor} onClick={() => {handleEditProduct(product,listType)}} />
              <Icon name={IconName.Delete} color={deleteColor} onClick={() => {handleClearProduct(product,listType)}} />
            </>
          );
          break;
        case ELists.Modified:
          controlsComponent = (
            <>
              <Icon name={IconName.Edit} color={editColor} onClick={() => {handleEditProduct(product,listType)}} />
              <Icon name={IconName.Undo} color={editColor} onClick={() => {handleClearProduct(product,listType)}} />
            </>
          );
          break;
        case ELists.Unmodified:
          controlsComponent = (
            <>
              <Icon name={IconName.Edit} color={editColor} onClick={() => {handleEditProduct(product,listType)}} />
              <Icon name={IconName.Delete} color={deleteColor} onClick={() => {handleClearProduct(product,listType)}} />
            </>
          );
          break;
        case ELists.Deleted:
          controlsComponent = (
            <>
              <Icon name={IconName.Recover} color={recoverColor} onClick={() => {handleClearProduct(product,ELists.Deleted)}} />
            </>
          );
          break;
        default:
          controlsComponent = null; // Set to null or a default component if listType doesn't match any case
          break;
      }
    
      return controlsComponent;
    };
    
    if(!products.length){
      return null;
    }

    return (
        <Col 
        ><Row
        p="0.5rem 1rem"
        a="center"
        j="between"
        h="initial"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          fontWeight: 600,
          fontFamily: "Raleway",
          background: theme.neutralColor.bgContainer,
          cursor: "pointer",
        }}
        br="6px"
      >
        <Row a="end">
            <Text w={6} tt="cap" s="16" c={titleColor || theme.neutralColor.text} mr="0.5rem">{listTitle}</Text>
            <Text w={5} s="12" c={titleColor || theme.neutralColor.textSecondary}>{`( ${products.length} )`}</Text>
            </Row>
        <Icon
          name={IconName.DownArrow}
          style={{
            transform: `rotate(${isExpanded ? "180deg" : "0deg"})`,
            transformOrigin: "center",
            marginTop: `${isExpanded ? "4px" : "0"}`,
            marginBottom: `${isExpanded ? "0" : "4px"}`,
          }}
        />
        </Row>
         {isExpanded === true  ? 
         <Col p="0.5rem" style={{ gap: "0.5rem" }}>
            {products.map((product,index) => (
              <Col
                key={index}
                br="8px"
                p={'0.5rem'}
                style={{
                  border: `1px solid ${EListsColors[listType]}`,
                  background: theme.neutralColor.bgContainer,
                }}
              >
                <ProductCard item={product} showCategory={true}/>
                <Row style={{gap: '0.5rem'}} a="center" j='end' p='0.5rem 1rem'>
                      <CardControl product={product}/>
                    </Row>
              </Col>
            ))}
          </Col> : null}
        </Col>
      )
  };

  export default ProductListEditable;