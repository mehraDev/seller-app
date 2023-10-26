import { IProductFood } from "app/interfaces";
import { useState } from "react";
import styled, { useTheme } from "styled-components";
import { Box, Col, Img, Row, Text } from "ui/basic";
import DrawerPreviewProduct from "../DrawerPreviewProduct/DrawerPreviewProduct";

export enum EItemCardFood {
  Card = "card",
  Strip = "strip",
  Preview = "preview",
}
export interface IItemFoodCard {
  item: IProductFood;
  onPreview?: (item: IProductFood) => void;
  mode?: EItemCardFood;
  showCategory? : boolean;
}

const ItemFoodCard: React.FC<IItemFoodCard> = ({
  item,
  onPreview,
  mode = EItemCardFood.Strip,
  showCategory= false
}) => {
  const theme = useTheme();

  const [preview,setPreview] = useState<IProductFood | null>(null)

  const handleClosePreview = () => {
    setPreview(null);
  }
  const handleItemPreview = () => {
    setPreview(item);
  };


  const isRow = mode === EItemCardFood.Strip;
  const { category }  = item;
  const categoryFormat = category ?  category?.replaceAll('/', ' / ') : 'Others';
  const isCategory = mode === EItemCardFood.Preview;
  const {description} = item;

  const isDescription = (mode === EItemCardFood.Preview && description);
  const fd = isRow ? "rr" : "c";
  const previewHandler = mode === EItemCardFood.Preview ? undefined : handleItemPreview;
  const detailsGap = isRow ? "0.5rem" : "0.5rem";
  const isVeg = item.veg || (item.veg !== false) 
  const imgWidth = mode === EItemCardFood.Preview ? '100%' : '55%';
  const imgHeight = mode === EItemCardFood.Preview ? '100%' : '7rem';
  const detailsPadding = mode ===  EItemCardFood.Preview ? '1rem 0.5rem' : "0.5rem 0 0 ";
  const imageRadius =  mode === EItemCardFood.Preview ?  "8px 8px 0 0 " :  "8px";
  return (
    <>
    <Box fd={fd} a="start" style={{ gap: isRow ? "1rem" : "" }} onClick={previewHandler}>
      {item.image ? (
      <Row w={imgWidth} h={imgHeight} style={{ borderRadius:imageRadius }}>
          <Img
            src={item.image}
            alt={item.name}
            br={imageRadius}
            style={{ cursor: "pointer" }}
          />
      </Row>
       ) : null}
      <Col p={detailsPadding} j="center" style={{ gap: detailsGap }}>
        <Row a="center">
          <Row
            w="initial"
            p="2px"
            a="center"
            style={{
              border: "1px solid " + (isVeg ? "green" : "#da0828"),
              borderRadius: "3px",
            }}
          >
            {isVeg ?    <VegIcon /> :  <NonVegIcon/>}
          </Row>
        </Row>
        { isCategory  ? 
          <Text s="12" w={6} c={theme.neutralColor.textTertiary}>{`In ${categoryFormat}`}</Text> :
          null
        }
        <Text
          tt="cap"
          w={5}
          s="16"
          c={theme.neutralColor.text}
          style={{ cursor: "pointer" }}
        >
          {item.name}
        </Text>
        <Text w={5} s="14" c={theme.neutralColor.textSecondary}>
          &#x20B9; {item.price}
        </Text>
        {isDescription && (
          <Row>
            <Text s="12" w={5} c={theme.neutralColor.textTertiary}>
              {description}
            </Text>
          </Row>
        )}
      </Col>
    </Box>
    <DrawerPreviewProduct isOpen={!!preview} onClose={handleClosePreview}>
      {preview && 
        <Row style={{boxShadow:theme.shadow.boxShadowSecondary, borderRadius:'8px'}}>
          <ItemFoodCard item={preview} mode={EItemCardFood.Preview}/>
        </Row>
      }
    </DrawerPreviewProduct>
    </>
  );
};

const VegIcon = styled.div`
  width: 6px;
  height: 6px;
  background: green;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NonVegIcon = styled.div`
  width: 6px;
  height: 6px;
  background: #da0828;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ItemFoodCard;
