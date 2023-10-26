import { useState } from "react";
import Form, { CategoryHierarchySelector, InputDescription, InputInteger, InputRadio, InputText } from "ui/Form";
import  styled, { useTheme } from "styled-components";
import { IProduct, IProductFood } from "app/interfaces";
import Button from "ui/Button";
import { Col, Img, Row } from "ui/basic";
import InputImageButton from "ui/Form/Inputs/InputImage";

export interface IForm {
  onSubmit: (item: IProduct, data: any) => void;
  products: IProduct[];
}

interface IAddProductFormFood extends IForm {
    products: IProduct[];
    onSubmit: (item: IProduct, data: any) => void;
}
export interface IEditProductFormFood extends IForm {
    product: IProductFood;
}
  
type IFormFood = IAddProductFormFood | IEditProductFormFood;

interface ICategory {
  [key : string ]: ICategory
}

const cat: ICategory = {
  recommended: {
    subCategory1: {},
    subCategory2: {
      subSubCategory1: {},
      subSubCategory2: {},
    },
  },
  chinese: {
    subCategory3: {},
    subCategory2: {
      subSubCategory1: {},
      subSubCategory2: {},
    },
  }
};

const FormFood: React.FC<IFormFood> = ({ onSubmit })=> {
  const theme = useTheme();
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number  | undefined>(undefined);
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [itemType, setItemType] = useState<string | 0>(0);
  const [nameError, setNameError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [typeError, setTypeError] = useState('');
  const [category,setCategory]  = useState<string>('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name) {
      setNameError('Required');
    }
    if (!price) {
      setPriceError('Required');
    }
    if (!itemType) {
      setTypeError('Requireds');
    }
  
    if (!name || !price || !itemType || nameError || priceError || typeError) {
      return;
    }
    const newProduct: IProductFood = {
      name,
      price,
      description,
      veg: itemType !== 'nonVeg',
      category,
    };
    onSubmit(newProduct,image)
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
  
  const handlePrice = (updatedPrice: number | undefined) => {
    setPrice(updatedPrice);
    clearError()
  }
  const handleType = (updatedType:string) => {
    setItemType(updatedType);
    clearError()
  }
  const handleCategory = (category:string) => {
    console.log('handling category')
    setCategory(category);
    clearError()
  }
  const handlePreview = () => {
  }
  return (
    <Form onSubmit={handleSubmit} noValidate>
      <InputText
        label="Name"
        value={name}
        placeholder="Enter Product name"
        onChange={(updatedName) => handleName(updatedName)}
        required={true}
        error={nameError}
      />
      <InputInteger
        label="Price"
        required={true}
        value={price}
        onChange={(updatedPrice) => handlePrice(updatedPrice || undefined)}
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
        onChange={(val) => handleType(val)}
        required={true}
        error={typeError}
      />
      <CategoryHierarchySelector categories={cat} activeCategory={category} onChange={handleCategory}/>
      <InputDescription
        value={description}
        onChange={(updatedDescription) => setDescription(updatedDescription)}
        label="Description"
        placeholder=""
      />
      <Col style={{border: '1px solid' +  theme.brandColor.primaryBg, borderRadius: '6px'}} p='1rem' a="center">
        {/* <ImageSelector shop='food' name={imageQuery} sellerId={""} onImageSelected={handleImageSelect} /> */}
       {image ? 
        <Img w="200px" h="200px" src={URL.createObjectURL(image)}/>
       : <InputImageButton onChange={img => setImage(img)} />}
      </Col>
      <Row j="center" a="center" style={{gap:'1rem'}}>
        <Button width="100%" type="button" onClick={handlePreview}>Preview</Button>
        <Button width="100%">Add Item</Button>
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
/* box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px; */
background: ${({color}) => color};
border-radius: 50%;
display: flex;
justify-content: center;
align-items: center;
`;

export default FormFood;

