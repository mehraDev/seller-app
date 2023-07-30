import { useState } from "react";
import Form, { InputDescription, InputInteger, InputRadio, InputText } from "ui/Form";
import styled, { useTheme } from "styled-components";
import { IProductFood } from "app/interfaces";
import Button from "ui/Button";
import ImageSelector from "../../Form/ImageSelector";
import { Col, Row } from "ui/basic";

export interface IForm {
  onSubmit: (foodItem: IProductFood) => void
}
interface IAddProductForm extends IForm {
}

const AddProductForm: React.FC<IAddProductForm> = ({ onSubmit })=> {
  const theme = useTheme();
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number  | undefined>(undefined);
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [itemType, setItemType] = useState<string | 0>(0);
  const [nameError, setNameError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [typeError, setTypeError] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [category,setCategory]  = useState<string | undefined>(undefined)
  const [imageQuery, setImageQuery] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!name) {
      setNameError('Please enter the product name.');
    }
    if (!price) {
      setPriceError('Please enter the product price.');
    }
    if (!itemType) {
      setTypeError('Please select a product type.');
    }
  
    if (!name || !price || !itemType || nameError || priceError || typeError) {
      return;
    }
    handleAddProduct();
  };

  const clearError = () => {
    setNameError('');
    setTypeError('');
    setPriceError('');
  }

  const handleName = (updatedName:string) => {
    setName(updatedName);
    clearError()
  }
  const handleAddProduct = async () => {
    try {
      setIsAdding(true);
      const success = await onSubmit({
        name:name,
        price,
        image,
        description,
      });
      console.log(success)
      if (success) {
        setName("");
        setPrice(undefined);
        setImage(null);
        setDescription("");
        setItemType(0);
  
        clearError();
        alert("Product added successfully");
      } else {
        alert("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred while adding the product");
    } finally {
      setIsAdding(false);
    }
  };
  
  const handlePrice = (updatedPrice:number | undefined) => {
    setPrice(updatedPrice);
    clearError()
  }
  const handleType = (updatedType:string) => {
    setItemType(updatedType);
    clearError()
  }
  const handleCategory = (category:string) => {
    setCategory(category);
    clearError()
  }
  const handleNameBlur = () => {
    if (name) {
      setImageQuery(name);
    }
  };
  return (
    <FoodForm onSubmit={handleSubmit} noValidate>
      <InputText
        label="Name"
        value={name}
        placeholder="Enter Product name"
        onChange={(updatedName) => handleName(updatedName)}
        required={true}
        onBlur={() => handleNameBlur()}
        error={nameError}
      />
      <InputInteger
        label="Price"
        required={true}
        value={price}
        onChange={(updatedPrice) => handlePrice( updatedPrice)}
        error={priceError}
      />
      <InputText
        label="Category"
        value={category || ''}
        placeholder="Enter Product Category"
        onChange={(category) => handleCategory(category)}
      />
      
      <InputRadio
      label="Type"
      options={[{label: 'Veg', value: 'veg'},{label: 'Non Veg', value:'nonVeg'}]}
      value={itemType}
        onChange={(val) => handleType( val)}
        required={true}
        error={typeError}
      />
     <Col style={{border: '1px solid '+ theme.neutralColor.border,background: theme.brandColor.primaryBg}} p='1rem' >
      <ImageSelector name={imageQuery} sellerId={""} onImageSelected={function (imageUrl: string): void {
        } } />
     </Col>

      <InputDescription
        value={description}
        onChange={(updatedDescription) => setDescription(updatedDescription)}
        label="Description"
        placeholder=""
      />
      <Row j="center" a="center" style={{gap:'1rem'}}>
        <Button width="100%">Preview</Button>
        <Button width="100%">Add Item</Button>
      </Row>
    </FoodForm>
  );
};

const FoodForm = styled(Form)`
  gap: 1.5rem;
  height: 90%;
`   

export default AddProductForm;

