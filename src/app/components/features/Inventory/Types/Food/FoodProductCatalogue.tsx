import { Product } from "../../ProductCatalogueHost";
import { Controls } from "./Controls";
import FoodProductCard from "./FoodProductCard";
import { CatalogueViewerWrapper, FoodCatalogueWrapper } from "./styles";

export interface FoodCatalogueTypes{
  products: Product[];
}


const FoodCatalogue : React.FC<FoodCatalogueTypes>= ({ products }) => {
    return (
        <FoodCatalogueWrapper>
            <Controls/>
            <CatalogueViewerWrapper>
            {products.map((product:Product) => (
              <FoodProductCard product={product} />
            ))}
            </CatalogueViewerWrapper>
            
          
        </FoodCatalogueWrapper>);
  };

  export default FoodCatalogue;