import { CartItem } from "./cart_types";

export interface FiltersState {
    cart: CartItem[];
    user: any,
    admin: any,
    category: string;
    sortByPrice: string;
    searchValue: string;
    minPrice: number;
    maxPrice: number;

  }