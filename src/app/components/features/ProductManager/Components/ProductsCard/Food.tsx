import { IProductFood } from "app/interfaces";
import { useState } from "react";
import styled, { useTheme } from "styled-components";
import { Box, Col, Img, Row, Text } from "ui/basic";
import DrawerPreviewProduct from "../DrawerPreviewProduct/DrawerPreviewProduct";
import Button from "ui/Button";
import { IVariant } from "app/interfaces/Shop/product";
import { getUrlImageStorage } from "firebaseServices/Storage";

export enum EItemCardFood {
  Card = "card",
  Strip = "strip",
  Preview = "preview",
}
export interface IItemFoodCard {
  item: IProductFood;
  mode?: EItemCardFood;
  showCategory? : boolean;
}

const ItemFoodCard: React.FC<IItemFoodCard> = ({
  item,
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
  const isCategory = showCategory || mode === EItemCardFood.Preview;
  const {description,tags} = item;

  const isDescription = (mode === EItemCardFood.Preview && description);
  const fd = isRow ? "rr" : "c";
  const previewHandler = mode === EItemCardFood.Preview ? undefined : handleItemPreview;
  const detailsGap = isRow ? "0.5rem" : "0.5rem";
  const isVeg = item.veg || (item.veg !== false) 
  const imgWidth = mode === EItemCardFood.Preview ? '100%' : '10rem';
  const imgHeight = mode === EItemCardFood.Preview ? '100%' : '100%';
  const detailsPadding = mode ===  EItemCardFood.Preview ? '1rem 0.5rem' : "0.5rem 0 0 ";
  const imageRadius =  mode === EItemCardFood.Preview ?  "8px 8px 0 0 " :  "8px";

  const defaultVariant = item.variants  ? item.variants.find(variant => variant.default) || item.variants[0]
  : null;
 
  const [selectedVariant, setSelectedVariant] = useState<IVariant | null>(defaultVariant);

  const handleVariantClick = (variant: IVariant) => {
      setSelectedVariant(variant);
  };
  const previewImageUrl = preview && preview.image ? getUrlWithSuffixFromUrl(preview.image,'.k100') : '';

  function getUrlWithSuffixFromUrl(url:string, suffix:string) {
    if (!url || !suffix) {
      return '';
    }
    const parsedUrl = new URL(url);
    const imageName = decodeURIComponent(parsedUrl.pathname.split('/').pop() || '');
    const baseImageLoc = imageName.replace(/\.[^/.]+$/, "");
    const suffixImageLoc = `${baseImageLoc}${suffix}`;
    const resultUrl = `${getUrlImageStorage(suffixImageLoc)}?alt=media`;

    console.log('suffixImageName',resultUrl)
    return resultUrl;
  }
  

  
  return (
    <>
    <Box fd={fd} a="start" style={{ gap: isRow ? "1rem" : "" }} >
      {item.image ? (
      <Row w={imgWidth} h={imgHeight} style={{ borderRadius:imageRadius }} onClick={previewHandler}>
          <Img
            src={item.image}
            alt={item.name}
            br={imageRadius}
            style={{ cursor: "pointer" }}
          />
      </Row>
       ) : null}
      <Col p={detailsPadding} j="center" style={{ gap: detailsGap }}>
        <Col onClick={previewHandler}  style={{ gap: detailsGap }}>
        <Row a="center" style={{ gap: '0.5rem' }}>
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
          <Row style={{ gap: '0.5rem' }}>
          {tags && tags.map((tag,index) => (
            <Row a="center" key={index} p='2px 8px' w="initial"  style={{background: tag.color ? tag.color : theme.brandColor.pink ,gap:'0.5rem',borderRadius:'4px'}} >
              <Text tt="upp" s="10" w={4} c={theme.neutralColor.bgContainer}>{tag.name}</Text>
            </Row>
          ))}
        </Row>
        </Row>
        { isCategory  ? 
          <Text tt="cap" s="12" w={6} c={theme.neutralColor.textTertiary}>{`In ${categoryFormat}`}</Text> :
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
          &#x20B9; {selectedVariant ? selectedVariant.price : item.price}
        </Text>
        </Col>
        {mode === EItemCardFood.Preview && item.variants && item.variants.length ? <Row a="center" style={{gap:'1rem'}}>
          {item.variants.map(variant => (
            <Button type="button" variant={selectedVariant?.variantId === variant.variantId ? 'primary' :"secondary"} size="small" padding="4px 6px" onClick={() => handleVariantClick(variant)}>{variant.name}</Button>
          ))}
        </Row>
        : null}
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
          <ItemFoodCard item={{...preview, image:previewImageUrl}} mode={EItemCardFood.Preview}/>
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
