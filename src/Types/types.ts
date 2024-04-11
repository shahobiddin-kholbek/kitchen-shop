import { ReactNode } from "react";
import { CartItem } from "./cart_types";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  rating: string;
  category: string;
  img: string[];
}

export interface GetProductsArgs {
  category?: string;
  sortByPrice?: string;
  searchValue?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface Errors {
  name: string;
  price: string;
  description: string;
  rating: string;
  img: string;
  category: string;
}

export interface Filters {
  minPrice: number;
  maxPrice: number;
  sortByPrice: string;
  category: string;
}

export interface TabItem {
  key: string;
  label: string;
  children: ReactNode;
}

export interface UpdatedProductData {
  name: string;
  price: number;
  description: string;
  category: string;
  img: string[]; 
}

export interface CascaderOption {
  value: string;
  label: string;
}

export interface Order {
  products: any;
  createdAt: string;
  customerId: string;
  id: string;
  product: {
    id: string;
    name: string;
    price: string;
    description: string;
    count: number;
    img: string[];
  };
  productId: string;
  quantity: number;
  totalPrice: string;
}

export interface AddOrderArgs {
  quantity: number;
  totalPrice: number;
  customerId: string;
  createdAt: Date;
  productsWithCount: { id: string; count: number }[];
}

export interface ProductCardProps {
  product: Product;
  IsItemOnCard: (id: string) => any | undefined;
}

export interface ProductModalProps {
  product: Product;
  isModalVisible: boolean;
  handleCancel: () => void;
  AddToCart: (product: Product) => void
  IsItemOnCard: (id: string) => CartItem | undefined
  handleRemoveFromCart: (productId: string) => void;
}