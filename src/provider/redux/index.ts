import { CartItem } from "@/Types/cart_types";
import { FiltersState } from "@/Types/redux_types";
import { Product } from "@/Types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: FiltersState = {
  cart: [],
  user: {},
  admin: {},
  category: "",
  sortByPrice: "",
  searchValue: "",
  minPrice: 0,
  maxPrice: 2000,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<CartItem[]>) {
      state.cart = action.payload;
      localStorage.setItem("cart", JSON.stringify(action.payload));
    },
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
    },
    setAdminData(state, action: PayloadAction<any>) {
      state.admin = action.payload;
      localStorage.setItem("admin", JSON.stringify(action.payload));
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setSortByPrice(state, action: PayloadAction<string>) {
      state.sortByPrice = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.sortByPrice = action.payload;
    },
    setMinPrice(state, action: PayloadAction<number>) {
      state.minPrice = action.payload;
    },
    setMaxPrice(state, action: PayloadAction<number>) {
      state.maxPrice = action.payload;
    },
  
  },
});

export const {
  setCategory,
  setMinPrice,
  setMaxPrice,
  setSortByPrice,
  setSearchValue,
  setCart,
  setUser,
  setAdminData,
} = filterSlice.actions;

export default filterSlice.reducer;
