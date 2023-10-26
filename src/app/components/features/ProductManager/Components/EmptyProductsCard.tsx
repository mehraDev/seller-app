import React from "react";
import { useTheme } from "styled-components";
import Button from "ui/Button";
import { Col, Text } from "ui/basic";

interface Props {
  onAddProductClick: () => void;
}

const EmptyProductsCard: React.FC<Props> = ({ onAddProductClick }) => {
  const theme = useTheme();
  return (
      <Col a="center" j="center" p={'2rem 0rem'}  style={{ gap:'1rem',background:'#fff',border:'1px solid ' + theme.neutralColor.borderSecondary, boxShadow: theme.shadow.shadow1}} br="12px">
      <Text c={theme.neutralColor.textSecondary} s='14' w={5}>No Produts Found</Text>
      <Button onClick={onAddProductClick}>
        Add Product
      </Button>
      </Col>
  );
};

export default EmptyProductsCard;

