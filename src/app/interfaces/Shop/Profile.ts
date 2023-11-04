import { EShop } from "app/enums";

export interface ISellerProfile {
  user: string;
  name: string;
  address: string;
  about: string[];
  type: EShop;
}
