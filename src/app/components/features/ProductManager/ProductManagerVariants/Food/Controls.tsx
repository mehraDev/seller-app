import { useState } from "react";
import { OptionsWrapper, ControlsWrapper, Option, OptionsWrapperMobileTab, OptionItem, OptionsList, OptionSelector, Options } from "./styles";
import Search from "ui/Search/Search";



import Modal from "ui/Modal/Modal";
import FoodAddItemForm from "./AddProductForm/Form";
import Icon, { IconName } from "ui/Icon";

export const Controls : React.FC = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [editing, setEditing] = useState(false);
  const [addItemOption, setAddItemOption] = useState(true);
  const handleEditClick = () => {
    setEditing(true);
  };

  const addItemOptionHandler = () => {
    setShowOptions(false)
    setAddItemOption(true);
  }

  const onCloseAddItemForm = () => {
    setAddItemOption(false);
  }
  return <ControlsWrapper>
        <Search />
        <OptionsWrapperMobileTab >
        <Icon name={IconName.Ellipsis} width={1.5} height={1.5} onClick={() => setShowOptions(!showOptions)}/>
        {showOptions && 
        <OptionsList>
        <OptionItem onClick={addItemOptionHandler}>Add Item</OptionItem>
        <OptionItem>Edit Item</OptionItem>
        </OptionsList>
        }
        </OptionsWrapperMobileTab>
        <Modal show={addItemOption}>
          <FoodAddItemForm onClose={() => onCloseAddItemForm()}/>
        </Modal>
        <OptionSelector>
          <Options> 
            <Option>
              Search  
            </Option> 
            <Option>
              Edit  
            </Option>  
          </Options>
        </OptionSelector>
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