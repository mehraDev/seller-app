import { useState } from "react";
import Form, { InputDescription, InputInteger, InputRadio, InputText, CategoryHierarchySelector } from "ui/Form";
import  styled, { useTheme } from "styled-components";
import { IProduct, IProductFood } from "app/interfaces";
import Button, { ButtonUnderlined } from "ui/Button";
import { Col, Img, Row ,Text} from "ui/basic";
import { createCategoryTree } from "../../utils";
import { ImageUploadWithPreview } from "ui/Image";
import { PRODUCT_CARD_DIMENSIONS } from "../../Components/ProductsCard/dimensionsConstants";
import { EShop } from "app/enums";

export interface IFormProduct {
  onSubmit: (item: IProduct, additionalData?: any) => void;
  products: IProduct[];
  editMode?: boolean;
  editProduct?: IProduct;
};

export interface IFormProductFood {
  onSubmit: (item: IProductFood, additionalData: any) => void;
  products: IProductFood[];
  editProduct?: IProductFood;
}

interface ICategory {
  [key : string]: ICategory
}

const FormProductFood: React.FC<IFormProductFood> = ({ onSubmit, products, editProduct })=> {
  const theme = useTheme();
  const categories: ICategory = createCategoryTree(products);
  const initialName = editProduct ? editProduct.name : "";
  const initialPrice = editProduct ? editProduct.price : '' ;
  const initialItemType = editProduct ? (editProduct.veg ? "veg" : "nonVeg") : null;
  const initialCategory = editProduct ? editProduct.category || "" : "";
  const initialDescription = editProduct ? editProduct.description || '': '';
  const initialImage = editProduct ? editProduct.image || '': '';
  
  const [name, setName] = useState(initialName);
  const [price, setPrice] = useState<number  | ''>(initialPrice);
  const [itemType, setItemType] = useState<'veg' | 'nonVeg' |null>(initialItemType);
  const [category,setCategory]  = useState<string>(initialCategory)
  const [description, setDescription] = useState(initialDescription);

  const [image, setImage] = useState<string>(initialImage);

  const [nameError, setNameError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [typeError, setTypeError] = useState('');

  const imageWidth = PRODUCT_CARD_DIMENSIONS[EShop.Food].width
  const imageHeight = PRODUCT_CARD_DIMENSIONS[EShop.Food].height
  const imageAspectRatio = +(imageWidth / imageHeight).toFixed(2);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateForm();
    
    if (Object.values(errors).some(error => error)) {
      return;
    }
    const newProduct: IProductFood = {
      name,
      price,
      description,
      veg: itemType === 'veg',
      category,
      image
    };
    onSubmit(newProduct, image);
  };

  const validateForm = () => {
    const errors = {
      name: '',
      price: '',
      itemType: '',
    };
  
    if (!name) {
      errors.name = 'Required';
    }
    
    if (!price) {
      errors.price = 'Required';
    }
    
    if (!itemType) {
      errors.itemType = 'Required';
    }
  
    setNameError(errors.name);
    setPriceError(errors.price);
    setTypeError(errors.itemType);
  
    return errors;
  };

  const clearError = () => {
    if(anyError) {
    setNameError('');
    setTypeError('');
    setPriceError('');
    }
  }
  const anyError = nameError || priceError || typeError;
  const handleNameChange = ( newName : string) => {
    setName(newName);
    clearError();
  }
  
  const handlePriceChange = ( newPrice:number | '') => {
    setPrice(newPrice);
    clearError();
  }
  const handleTypeChange = (updatedType:'veg' | 'nonVeg') => {
    setItemType(updatedType);
    clearError();
  }
  const handleCategory = (category:string) => {
    setCategory(category);
    clearError()
  }
  const handlePreview = () => {
    const formData = {
      name,
      price,
      description,
      itemType,
      category,
    };
  }
  const isSaveDisabled = !(name && price && itemType)
  return (
    <Form onSubmit={handleSubmit} noValidate style={{gap:'1.5rem'}}>
      <InputText
        tt="cap"
        label="Name"
        value={name}
        placeholder="Enter Product name"
        onChange={handleNameChange}
        required={true}
        error={nameError}
      />
      <InputInteger
        label="Price"
        required={true}
        value={price}
        onChange={handlePriceChange}
        error={priceError}
      />
      <InputRadio
        label="Type"
        options={[
          {
            label: 'Veg',
            value: 'veg',
            icon: VegNonVegIcon,
            colorActive: 'green',
            colorDisabled: 'gray',
          },
          {
            label: 'Non Veg',
            value: 'nonVeg',
            icon: VegNonVegIcon,
            colorActive: '#da0828',
            colorDisabled: 'gray',
          },
        ]}
        value={itemType}
        onChange={handleTypeChange}
        required={true}
        error={typeError}
      />
      <CategoryHierarchySelector categories={categories} activeCategory={category} onChange={handleCategory}/>
      <InputDescription
        value={description}
        onChange={(updatedDescription) => setDescription(updatedDescription)}
        label="Description"
        placeholder="Enter product details."
      />
      <Col a="center">
        <Row p='0.5rem 0' a="center" j="end">
          <Row><Text w={5}>Product Image</Text></Row>
          <Row a="center" j="end" style={{gap:'0.5rem'}}>
            {image !== '' &&
              <ButtonUnderlined  border={'none'} variant="secondary" padding="2px 4px"  size="small" type="button" onClick={()=> setImage('')}>Remove</ButtonUnderlined>}
          </Row>
        </Row>
        <Col br="8px" w="50%" p='1rem' a="center" style={{border:'1px solid ' + theme.neutralColor.border }} j="center">
          {
            image
            ? 
            <Img src={image}/>
            :
            <ImageUploadWithPreview aspectRatio={imageAspectRatio} onUpload={img => setImage(img)} />
          }
        </Col>
      </Col>
      <Row j="center" a="center" style={{gap:'1rem'}} p='1rem 0' >
        <Button padding="1rem" width="100%" type="button" onClick={handlePreview} disabled={isSaveDisabled}>Preview</Button>
        <Button padding="1rem" width="100%" disabled={isSaveDisabled}>Save</Button>
      </Row>
    </Form>
  );
};

const VegNonVegIcon = (color: string) => {
  return (
    <Row
          w="initial"
          p="4px"
          m="0 0.2rem"
          style={{ border: "1px solid " + color, borderRadius: "4px" }}
        >
          <TypeIcon color={color}/>
        </Row>
   
  )
}

const TypeIcon = styled.div<{color:string}>`
width: 8px;
height: 8px;
background: ${({color}) => color};
border-radius: 50%;
display: flex;
justify-content: center;
align-items: center;
`;


export default FormProductFood;

