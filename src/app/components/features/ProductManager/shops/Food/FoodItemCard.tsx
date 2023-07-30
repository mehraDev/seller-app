import { IProductFood } from "app/interfaces";
import styled from "styled-components";
import { Box, Col, Img, Row, Text } from "ui/basic";

interface IFoodItemCard {
  item: IProductFood;
}
const FoodItemCard: React.FC<IFoodItemCard> = ({ item }) => {
  console.log(item.image);
  return (
    <FoodWrapper key={item.id} p="2">
      {item.image && (
        <Box j="center">
          <Img src={item.image || ""} alt={item.name} w="80%" h="214px" />
        </Box>
      )}
      <Row h="14px" a="start" j="end">
        {item.veg ? <VegIcon /> : <NonVegIcon />}
      </Row>
      <Row j="between">
        <Text w={5} c="black" mb="4px">
          {item.name}
        </Text>
        <Text>${item.price}</Text>
      </Row>
    </FoodWrapper>
  );
};

const FoodWrapper = styled(Col)`
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  background: white;
  border-radius: 4px;
`;
const VegIcon = styled.div`
  width: 8px;
  height: 8px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  background: red;
  border-radius: 3px;
`;
const NonVegIcon = styled.div`
  width: 8px;
  width: 8px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  background: red;
  border-radius: 3px;
`;
export default FoodItemCard;
