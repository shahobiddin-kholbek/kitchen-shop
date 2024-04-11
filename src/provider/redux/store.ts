import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./apies/productsApi";
import { ordersApi } from "./apies/ordersApi"; 
import filtersReducer from './index'; 

const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer, 
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware, ordersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
