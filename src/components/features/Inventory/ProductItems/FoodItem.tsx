import React from "react";
import styled from "styled-components";

interface FoodItemProps {
  item?: {
    name?: string;
    price?: number;
    isVegetarian?: boolean;
    image?: string;
    description?: string;
  };
}

const FoodItem: React.FC<FoodItemProps> = ({ item = {} }) => {
  const { name = "", price = 0, isVegetarian = false, image = "", description = "" } = item;

  return (
    <Card>
      <IconContainer>
        <Icon>{isVegetarian ? "🥕" : "🍗"}</Icon>
      </IconContainer>
      <Image src={image} alt={name} />
      <Details>
        <Name>{name}</Name>
        <Price>{price}</Price>
        <Description>{description}</Description>
      </Details>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

const Icon = styled.span`
  font-size: 1.5rem;
`;

const Image = styled.img`
  width: 100%;
  height: 0;
  padding-top: 60%;
  object-fit: cover;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const Name = styled.h2`
  font-size: 1.5rem;
  margin: 0;
`;

const Price = styled.p`
  font-size: 1.2rem;
  margin: 5px 0 0;
`;

const Description = styled.p`
  font-size: 1rem;
  margin: 10px 0 0;
`;

export default FoodItem
