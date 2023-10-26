import ProductsViewer from "app/components/features/ProductManager/Components/ProductsViewer";
import { EShop } from "app/enums";
import { Col, Row, Text } from "ui/basic";
import { useTheme } from "styled-components";
import Icon, { IconName } from "ui/Icon";

interface IProductsViewerWidget {
  containerRef: React.RefObject<HTMLDivElement>;
}

const ProductsViewerWidget:React.FC<IProductsViewerWidget> = ({containerRef}) => {
  const theme = useTheme();

  return (
    <Col style={{background:theme.neutralColor.bgContainer}}>
    <Row p='1rem' j="between" a="center" style={{ borderBottom: `1px solid ${theme.neutralColor.borderSecondary}` ,background: theme.neutralColor.bgContainer}}>
      <Text s="16"  w={7} c={theme.neutralColor.text} type="heading">Products</Text>
    </Row>
      <ProductsViewer scrollRef={containerRef} shop={EShop.Food} />
  </Col>
  );
};

export default ProductsViewerWidget;
