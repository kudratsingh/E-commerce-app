import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';



const store = configureStore({
    reducer: {
        user: userReducer,
        products: productReducer, // add the product reducer
        cart: cartReducer // add the cart reducer
      },
      devTools: true,
});

export default store;
