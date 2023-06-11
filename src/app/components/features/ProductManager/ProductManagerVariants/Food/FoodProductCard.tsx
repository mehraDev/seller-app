import React from "react";
import styled from "styled-components";
import {  IFoodProduct } from "../../interface/Product";
import media from "ui/Utils/Media/media";
import Icon, { IconName } from "ui/Icon";

type FoodProductCardWrapperProps = {
  width:  number,
  height: number
};

interface FoodProductCardProps{
  height: number;
  width: number
  product: IFoodProduct
}
const FoodProductCardWrapper = styled.div<FoodProductCardWrapperProps>`
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
    background-color: white;
    border-radius: 4px;
    overflow: hidden;
    width: 49%;
    height: 13rem;

    ${media.tablet}{
      width: 24%;
    }
    ${media.desktop}{
      width: 19%;
    }

  

  /* & > div {
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  } */

  /* & div {
    font-size: 20px;
    margin-top: 0;
    margin-bottom: 5px;
  } */

  & p {
    font-size: 16px;
    margin: 0;
    display: flex;
    align-items: center;
  }

  & .price {
    margin-left: auto;
  }

  & .veg {
    display: inline-block;
    background-color: green;
    color: white;
    font-size: 12px;
    padding: 2px 5px;
    border-radius: 5px;
    margin-right: 5px;
  }

  & .non-veg {
    display: inline-block;
    background-color: red;
    color: white;
    font-size: 12px;
    padding: 2px 5px;
    border-radius: 5px;
    margin-right: 5px;
  }
`;

const FOOD_DUMMY_PRODUCT_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/cloudyug-f2fe4.appspot.com/o/s%2Ffood%2Fp%2Fpizza-1684092131674?alt=media&token=ea09cca2-c93e-4437-abaa-a89eb74caab4'
const FoodProductCard: React.FC<FoodProductCardProps> = ({ product,height,width }) => {
  const { name, description, price, image,isVeg } = product;
  return (
    <FoodProductCardWrapper width={width} height={height}>
      <FoodImageWrapper>
        <img src={image || FOOD_DUMMY_PRODUCT_IMAGE} alt={name} />
        {/* <Icon name={IconName.VegNonveg} color={!veg ? 'red' : 'green'} isHoverable={false}/> */}
      </FoodImageWrapper>
      <FoodLabelWrapper>
        <LabelWrapper>{name}</LabelWrapper>
        <PriceWrapper> &#8377; {`${price}`}</PriceWrapper>
      </FoodLabelWrapper>
    </FoodProductCardWrapper>
  );
};


const FoodImageWrapper = styled.div`
position: relative;
width: 100%;
height: 25%;

  &  > img {
    height: 9rem;
    width: 9rem;
    position: absolute;
    border-radius: 50%;
    margin-left: 14%;

  }
`

const FoodLabelWrapper = styled.div`
  border: 1px solid ${({theme}) => theme.neutralColor.borderSecondary};
  padding-top: 54%;
  box-shadow: ${({theme}) => theme.shadow.boxShadowSecondary};
  text-align: center;
  height: 80%;
  
  
  border-radius: 0.5rem;
  ;
`;

const PriceWrapper = styled.div`
  font-size:  ${({theme}) => theme.font.fontSizeSM};
  font-weight: 600;
  color:#ff9c09;
`;
const LabelWrapper = styled.div`
  font-size:  ${({theme}) => theme.font.fontSizeLG};
  color: ${({theme}) => theme.neutralColor.text};
  font-weight: 500;
  margin-bottom: 0.5rem;
`;
export default FoodProductCard;
