import React, { useState } from "react";
import { FoodForm, ImageInputWrapper, ImageSuggestionsWrapper } from "../styles";
import { DropdownInput, ImageInput, IntegerInput, TextInput, VegNonvegInput } from "ui/Form";
import DescriptionInput from "ui/Form/Inputs/DescriptionInput";
import { PriceVegNonVegWrapper } from "ui/Form/Inputs/styles";
import ImageViewer from "ui/ImageViewer/ImageViewer";

const FoodAddItemForm = () => {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [isVeg, setIsVeg] = useState(true);
  const [size, setSize] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Handle form submission logic here
    // You can access the form data from the state variables

    // Reset form fields after submission
    setItemName("");
    setPrice(0);
    setImage("");
    setDescription("");
    setIsVeg(false);
    setSize("");
  };
  const options = ["Option 1", "Option 2", "Option 3"];
  const [selectedOption, setSelectedOption] = useState("");
  return (
    <FoodForm onSubmit={handleSubmit}>
        <TextInput label="Name" value={itemName} placeholder="Name" onChange={(updatedName) => setItemName(updatedName)} required={true}/>
        <PriceVegNonVegWrapper> 
          <IntegerInput label="Price" required={true} value={price} onChange={(updatedPrice) => setPrice(updatedPrice)} />
          <VegNonvegInput value={isVeg} onChange={(isVeg) => setIsVeg(isVeg)} required={false}/>
        </PriceVegNonVegWrapper>
        <ImageInputWrapper >
        <ImageInput onChange={() => console.log('image')} />
        </ImageInputWrapper>
        <ImageSuggestionsWrapper>
          <div>Image Suggestions</div>
          <ImageViewer images={[]}/>
        </ImageSuggestionsWrapper>
        
        <DescriptionInput value={""} onChange={() => console.log('input')} label="Description" placeholder="About the Food"/>

      <DropdownInput
            label="Category"
            options={options}
            value={selectedOption}
            onChange={setSelectedOption}
            placeholder="Select an option"
            />
{/* <DropdownInput
  label="Sizes"
  options={options}
  value={selectedOption}
  onChange={setSelectedOption}
  placeholder="Select an option"
/> */}

      <button type="submit">Add Item</button>
    </FoodForm>
  );
};

export default FoodAddItemForm;
