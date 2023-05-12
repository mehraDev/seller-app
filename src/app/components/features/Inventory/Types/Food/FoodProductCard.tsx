import React from "react";
import styled from "styled-components";
import { Product } from "../../ProductCatalogueHost";

type FoodProductCardProps = {
  product: Product;
};

const FoodProductCardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 18%;
    height: 11rem;
    margin-bottom: 0.5rem;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
    border-radius: 5px;
    overflow: hidden;

  & img {
    width: 100%;
    height: auto;
    padding: 0.5rem;
    height: 70%;
  }

  & > div {
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  & h3 {
    font-size: 20px;
    margin-top: 0;
    margin-bottom: 5px;
  }

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

const FoodProductCard: React.FC<FoodProductCardProps> = ({ product }) => {
  const { name, description, price } = product;
    const image = 'https://firebasestorage.googleapis.com/v0/b/cloudyug-f2fe4.appspot.com/o/s%2Ffood%2Fp%2Fburger-1683839807217?alt=media&token=3ba03dec-6ae2-43f0-b380-182f49b93620';
    const isVegetarian = true;
  return (
    <FoodProductCardWrapper>
      <img src={image} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
        <p>
          {isVegetarian ? (
            <span className="veg">Veg</span>
          ) : (
            <span className="non-veg">Non-Veg</span>
          )}
          <span className="price">${price}</span>
        </p>
      </div>
    </FoodProductCardWrapper>
  );
};

export default FoodProductCard;
