import React from "react";
import styled from "styled-components";
import { FoodProduct, Product } from "../../interface/Product";
import media from "ui/Utils/Media/media";
import Icon, { IconName } from "ui/Icon";

type FoodProductCardWrapperProps = {
  width:  number,
  height: number
};

interface FoodProductCardProps{
  height: number;
  width: number
  product: FoodProduct
}
const FoodProductCardWrapper = styled.div<FoodProductCardWrapperProps>`
    display: flex;
    flex-direction: column;
    height: 11rem;
    margin-bottom: 0.5rem;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
    border-radius: 4px;
    overflow: hidden;
    width: 49%;
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
  const { name, description, price, image,veg } = product;
  return (
    <FoodProductCardWrapper width={width} height={height}>
      <FoodImageWrapper>
        <img src={image || FOOD_DUMMY_PRODUCT_IMAGE} alt={name} />
        <Icon name={IconName.VegNonveg} color={!veg ? 'red' : 'green'} isHoverable={false}/>
      </FoodImageWrapper>
      
      <div>
        <div>{name}</div>
        <p>{description}</p>
        
      </div>
    </FoodProductCardWrapper>
  );
};


const FoodImageWrapper = styled.div`
position: relative;
margin: 0.5rem;
  &  > img {
    width: 100%;
    height: auto;
    height: 70%;
  }
  &  > svg {
    position: absolute;
    right: 0;
  }
`
export default FoodProductCard;
