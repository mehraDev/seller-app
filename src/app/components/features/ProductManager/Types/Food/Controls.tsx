import { useState } from "react";
import { Product } from "../../Host";
import View from "./View";
import { OptionsWrapper, ControlsWrapper, SelectWrapper, OptionsWrapperMobileTab, OptionItem, OptionsList } from "./styles";
import Search from "ui/Search/Search";
import Icon from "ui/Icon/Icon";
import { IconName } from "ui/Icon/iconNames";

export const Controls : React.FC = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [editing, setEditing] = useState(false);
  const handleEditClick = () => {
    setEditing(true);
  };
  return <ControlsWrapper>
        <Search />
        <OptionsWrapperMobileTab >
        <Icon name={IconName.Ellipsis} width={1.5} height={1.5} onClick={() => setShowOptions(!showOptions)}/>
        {showOptions && 
        <OptionsList>
        <OptionItem>Add Item</OptionItem>
        <OptionItem>Edit Item</OptionItem>
      </OptionsList>
      }
        </OptionsWrapperMobileTab>
        {/* {editing ? 
        <OptionsWrapper>
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
        <View />
        <div>
        <select name="filter" id="filter">
        <option value="price">Price</option>
        <option value="rating">Rating</option>
        <option value="name">Name</option>
        </select>
        </div>
        </OptionsWrapper> :
        <OptionsWrapper>
      <div>
        Add
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
      <View />
      <div>
      <select name="filter" id="filter">
      <option value="price">Price</option>
      <option value="rating">Rating</option>
      <option value="name">Name</option>
      </select>
      </div>
        </OptionsWrapper>}
        
        <SelectWrapper>
        <button onClick={handleEditClick}>Edit</button>
        </SelectWrapper> */}
  </ControlsWrapper>
};