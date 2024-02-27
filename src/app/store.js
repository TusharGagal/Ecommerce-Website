import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/Product-List/ProductSlice";
import authReducer from "../features/Auth/AuthSlice";
import cartReducer from "../features/Cart/CartSlice";
import orderReducer from "../features/Order/OrderSlice";
export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});
