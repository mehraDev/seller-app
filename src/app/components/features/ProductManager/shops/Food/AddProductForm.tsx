import { useState } from "react";
import Form, { InputDescription, InputInteger, InputRadio, InputText } from "ui/Form";
import styled from "styled-components";
import InputImageButton from "ui/Form/Inputs/InputImage";
import ImageViewer from "ui/ImageViewer/ImageViewer";
import ImageSearch from "ui/ImageSearch/ImageSearch";

const AddProductForm = () => {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState<number | string | undefined>();
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [vegRadio, setVegRadio] = useState<string | 0>(0);
  const [size, setSize] = useState("");

  const handleSubmit = (event:any) => {
    event.preventDefault();
    setItemName("");
    setPrice('');
    setImage("");
    setDescription("");
    setVegRadio(0);
    setSize("");

  };

  return (
    <FoodForm onSubmit={handleSubmit}>
      <InputText
        label="Name"
        value={itemName}
        placeholder="Enter Product name"
        onChange={(updatedName) => setItemName(updatedName)}
        required={true}
      />
      <InputInteger
        label="Price"
        required={true}
        width='120px'
        value={price}
        onChange={(updatedPrice) => setPrice( updatedPrice ? updatedPrice : undefined)}
      />
      <InputRadio
      label="Veg / NonVeg"
      options={[{label: 'Veg', value: 'veg'},{label: 'Non Veg', value:'nonVeg'}]}
      value={vegRadio}
        onChange={(val) => {setVegRadio( val); }}
      />
      <InputImageButton onChange={(s) => {console.log(s);setImage(s)}}/>
      {image && 
      <>
      <p>Image Preview</p>
      <ImageViewer images={[image]} />
      </>}
      <p>Image Suggestions</p> 
      {
      
        itemName && <>
      <ImageSearch query={itemName} numResults={4} />
      </>
      }
      
      <InputDescription
        value={description}
        onChange={(updatedDescription) => setDescription(updatedDescription)}
        label="Description"
        placeholder=""
      />
      

      <StyledButton type="submit">Add</StyledButton>
    </FoodForm>
  );
};

const FoodForm = styled(Form)`
  gap: 1.5rem;
`   

const StyledButton = styled.button`
  background-color: #e51579;
  color: #ffffff;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #cf136e;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(243, 33, 212, 0.3);
  }
`;
export default AddProductForm;

