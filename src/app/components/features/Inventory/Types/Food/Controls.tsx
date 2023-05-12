import { Product } from "../../ProductCatalogueHost";
import View from "./View";
import { ControlButtonsWrapper, ControlsWrapper, SelectWrapper } from "./styles";
import Search from "ui/Search/Search";

export const Controls : React.FC = () => {
  return <ControlsWrapper>
        <Search />
        <SelectWrapper>
          <div>
            <select name="category" id="category">
              <option value="all">All</option>
              <option value="appetizers">Appetizers</option>
              <option value="entrees">Entrees</option>
              <option value="desserts">Desserts</option>
            </select>
          </div>
          <div>
            <label htmlFor="sort">Sort </label>
            <select name="sort" id="sort">
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div>
            <select name="tags" id="tags">
              <option value="all">All</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="gluten-free">Gluten-free</option>
              <option value="spicy">Spicy</option>
            </select>
          </div>
        </SelectWrapper>
        <ControlButtonsWrapper>
        <View />
        <div>
          <select name="filter" id="filter">
          <option value="price">Price</option>
          <option value="rating">Rating</option>
          <option value="name">Name</option>
          </select>
        </div>
        <button>Edit</button>
        </ControlButtonsWrapper>
  </ControlsWrapper>
};