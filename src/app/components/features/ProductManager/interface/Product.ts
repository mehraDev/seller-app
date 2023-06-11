export interface IProduct {
    id: number;
    name: string;
    price?: number;
    description?: string;
    image?: string;
    
}
export interface IProductManager{
  products: IProduct[];
}
export interface IFoodProduct extends IProduct {
  isVeg? : boolean;
}