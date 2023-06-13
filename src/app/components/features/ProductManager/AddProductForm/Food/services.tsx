
interface FormData {
  itemName: string;
  price: number;
  image: string;
  description: string;
  isVeg: boolean;
  size: string;
}

const addFoodProduct = async (formData: FormData): Promise<void> => {
  try {
    console.log('Form data submitted successfully');
  } catch (error) {
    console.error('Error submitting form data:', error);
  }
};

export default addFoodProduct;
