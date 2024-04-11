import { CartItem } from "./cart_types";

export interface FiltersState {
    cart: CartItem[];
    category: string;
    sortByPrice: string;
    searchValue: string;
    minPrice: number;
    maxPrice: number;
  
  }