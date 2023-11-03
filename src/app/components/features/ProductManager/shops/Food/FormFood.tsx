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
import { IFoodTag, IVariant,EFoodTagType } from "app/interfaces/Shop/product";
import InputCheckbox from "ui/Form/Inputs/InputCheckbox";
import InputWithSuggestions from "ui/Form/Inputs/InputWithSuggestions";
import Icon, { IconName } from "ui/Icon";

export interface IFormProduct {
  onSubmit: (item: IProduct, additionalData?: any) => void;
  products: IProduct[];
  editMode?: boolean;
  editProduct?: IProduct;
};

export interface IFormProductFood {
  onSubmit: (item: IProductFood, additionalData?: any) => void;
  products: IProductFood[];
  editProduct?: IProductFood;
}

interface ICategory {
  [key : string]: ICategory
}

const FormProductFood: React.FC<IFormProductFood> = ({ onSubmit, products, editProduct })=> {
  const theme = useTheme()
  const categories: ICategory = createCategoryTree(products);
  const initialName = editProduct ? editProduct.name : "";
  const initialItemType = editProduct ? (editProduct.veg ? "veg" : "nonVeg") : null;
  const initialCategory = editProduct ? editProduct.category || "" : "";
  const initialDescription = editProduct ? editProduct.description || '': '';
  const initialImage = editProduct ? editProduct.image || '': '';
    const defaultVariant = {
      name: '',
      price: 0,
      variantId: '1'
  };

  const initialVariants = (editProduct && editProduct.variants && editProduct.variants.length) ? editProduct.variants : [defaultVariant];
  const [variants, setVariants] = useState<IVariant[]>(initialVariants);
  const [isMultiVariant, setIsMultiVariant] = useState((!!editProduct && !!editProduct.variants));
  const [name, setName] = useState(initialName);
  const [itemType, setItemType] = useState<'veg' | 'nonVeg' |null>(initialItemType);
  const [category,setCategory]  = useState<string>(initialCategory)
  const [description, setDescription] = useState(initialDescription);
  const initialPrice = editProduct && editProduct.price ? editProduct.price : '' ;
  const [price, setPrice] = useState<number  | ''>(initialPrice);
  const [tags, setTags] = useState<IFoodTag[]>(editProduct ? editProduct.tags || [] : []);
  const [newTagName, setNewTagName] = useState<string>('');
  const [image, setImage] = useState<string>(initialImage);

  const [nameError, setNameError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [typeError, setTypeError] = useState('');

  const imageWidth = PRODUCT_CARD_DIMENSIONS[EShop.Food].width
  const imageHeight = PRODUCT_CARD_DIMENSIONS[EShop.Food].height
  const imageAspectRatio = +(imageWidth / imageHeight).toFixed(2);
  const getUniqueVariantNames = (products: IProductFood[]): string[] => {
    const uniqueVariantsSet: Set<string> = new Set();

    products.forEach(product => {
        if (product.variants) {
            product.variants.forEach(variant => {
                if (variant.name) {
                    uniqueVariantsSet.add(variant.name);
                }
            });
        }
    });

    return Array.from(uniqueVariantsSet);
}
const getUniqueTagNames = (products: IProductFood[]): string[] => {
  const uniqueTagsSet: Set<string> = new Set();

  Object.values(EFoodTagType).forEach(tag => uniqueTagsSet.add(tag));
  
  products.forEach(product => {
      if (product.tags) {
          product.tags.forEach(tag => {
              if (tag) {
                  uniqueTagsSet.add(tag.name);
              }
          });
      }
  });
  return Array.from(uniqueTagsSet);
}
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('clicked')
    // const errors = validateForm();
    
    // if (Object.values(errors).some(error => error)) {
    //   return;
    // }
    const isVeg = itemType !== 'nonVeg' ? true : false;
    const newProduct: IProductFood = {
      name,
      price,
      description,
      veg: isVeg,
      category,
      image,
    };

    const isVariant = isMultiVariant ? true : false;
    if(isVariant){
      newProduct.variants = variants;
    }
    if(tags && tags.length){
      newProduct.tags = tags;
    }
    onSubmit(newProduct);
  };

  const handleAddTag = () => {
    if (newTagName && !tags.some(tag => tag.name.toLowerCase() === newTagName.toLowerCase())) {
      setTags(prevTags => [...prevTags, {name:newTagName}]);
    }
    setNewTagName('');
};

const handleDeleteTag = (tagIndex: number) => {
    setTags(prevTags => prevTags.filter((_, index) => index !== tagIndex));
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
  }

  const isSaveDisabled = !(name && ((!isMultiVariant && price) || (isMultiVariant && variants.every(val => val.name !== '' && val.price > 0))) && itemType);
  const handleVariantChange = (field: 'name' | 'price', value: string | number, index: number) => {
    setVariants(prevVariants => prevVariants.map((variant, i) => {
        if (i !== index) return variant;
        return { ...variant, [field]: value };
    }));
};
  
  const handleAddVariant = () => {
    setVariants([...variants, { variantId: `${variants.length+1}`, name: '', price: 0 }]);
  };
  
  const handleRemoveVariant = (index: number) => {
    const updatedVariants = [...variants];
    updatedVariants.splice(index, 1);
    setVariants(updatedVariants);
  };
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
     <Col>
     <Row a='center' j="end"> 
        <InputCheckbox
            options={[{
              label: 'Variants',
              value: 'multipleVarieties',
              selected: isMultiVariant,
            }]}
            onChange={() => setIsMultiVariant(!isMultiVariant)}
            value={undefined} />
      </Row>
      {isMultiVariant ? (
      <Col style={{gap:'1rem'}}>
          {variants.map((variant, index) => (
            <Row key={0} a="center" style={{gap:'1rem'}} j="between" >
              <Row w="90%" a="start" j="between"  style={{gap:'1rem'}}>
              <InputWithSuggestions
                value={variant.name}
                label="Variant"
                placeholder="Variant Name"
                onChange={(value) => handleVariantChange('name', value, index )}
                suggestions={getUniqueVariantNames(products)}
              />
              <InputInteger
                label="Price"
                value={variant.price}
                onChange={(value) => handleVariantChange('price', value, index )}
              />
              </Row>
              {variants.length > 1 && (
              <Icon name={IconName.Clear} onClick={() => handleRemoveVariant(index)} />
              )}
            </Row>
        ))}

      <Button disabled={ !variants.length || variants.some(variant => (!variant.price  || !variant.name) )} type="button" onClick={handleAddVariant}>Add more variant</Button>
  </Col>
) : (
  <InputInteger
    label="Price"
    required={true}
    value={price}
    onChange={handlePriceChange}
    error={priceError}
  />
)}
     </Col>
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

      <Row style={{ gap: '1rem' }} a="end">
          <Row w="10rem">
            <InputWithSuggestions
              label="Tag"
              placeholder="Enter Tag"
              onChange={(tag) => setNewTagName(tag)}
              value={newTagName}
              suggestions={getUniqueTagNames(products)}
            />
          </Row>
          <Button type="button" disabled={!newTagName} onClick={handleAddTag}>Add Tag</Button>
        </Row>
        <Row style={{ gap: '1rem' }}>
          {tags.map((tag,index) => (
            <Row a="center" key={index} p='2px 8px' w="initial"  style={{background: tag.color ? tag.color : theme.brandColor.pink ,gap:'0.5rem'}} br="0.5rem">
              <Text tt="cap" s="12" w={4} c={theme.neutralColor.bgContainer}>{tag.name}</Text>
              <Icon name={IconName.Clear} color={theme.neutralColor.bgContainer} onClick={() => handleDeleteTag(index)}/>
            </Row>
          ))}
        </Row>

      <Col a="center" style={{gap:'0.5rem'}}>
        <Row p='0.5rem 0' a="center" j="end">
          <Row><Text w={5}>Product Image</Text></Row>
          <Row a="center" j="end" style={{gap:'0.5rem'}}>
            {image !== '' &&
              <ButtonUnderlined  border={'none'} variant="secondary" padding="2px 4px"  size="small" type="button" onClick={()=> setImage('')}>Remove</ButtonUnderlined>}
          </Row>
        </Row>
        <Col br="8px" w="60%"  a="start" j="center">
          {
            image
            ? 
            <Img src={image} br="8px"/>
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

