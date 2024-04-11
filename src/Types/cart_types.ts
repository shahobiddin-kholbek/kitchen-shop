export interface CartItem {
  id: string;
  name: string;
  price: number;
  description: string;
  rating: string;
  count: number;
  category: string;
  img: string[];
  }

 export interface AddCartItemArgs {
    productId: string;
  }
  
 export interface UpdateCartItemArgs{
    id: string;
    quantity: number; 
  }

