export interface IProduct {
    id: number;
    name: string;
    price?: number;
    description?: string;
    image?: string;
    
}

export interface IProductFood extends IProduct {
  isVeg? : boolean;
}