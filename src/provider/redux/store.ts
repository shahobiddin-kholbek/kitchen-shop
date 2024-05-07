import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./apies/productsApi";
import { ordersApi } from "./apies/ordersApi"; 
import filtersReducer from './index'; 
import { usersApi } from "./apies/usersApi";
import { adminApi } from "./apies/adminApi";

const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer, 
    [usersApi.reducerPath]: usersApi.reducer, 
    [adminApi.reducerPath]: adminApi.reducer, 
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
    serializableCheck: { warnAfter: 128 },
    }).concat(productsApi.middleware, ordersApi.middleware, usersApi.middleware, adminApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
