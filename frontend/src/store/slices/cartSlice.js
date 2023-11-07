import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addToCart, getCart } from '../../utility/cartAPI'; 

const initialState = {
    items: [],
    totalCost: 0,
    totalItems: 0,
    status: 'idle',
    error: null
};

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getCart();
            if (!response.ok) {
                throw new Error('Failed to fetch cart.');
            }
            const data = await response.json();  // Add await here
            console.log("API Response:", data);
            return data;
        } catch (error) {
            console.error("API Error:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const addProductToCart = createAsyncThunk(
    'cart/addToCart',
    async (productData, { rejectWithValue }) => {
        console.log("Redux Slice Payload:", productData);
        try {
            const response = await addToCart(productData.productId._id, productData.quantity);
            if (!response.ok) {
                throw new Error('Failed to add product to cart.');
            }
            const data = await response.json();
            console.log("API Response when adding product:", data);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                console.log("Redux Slice Payload:", action.payload);
                state.status = 'succeeded';
                state.items = action.payload.items;
                state.totalCost = action.payload.totalCost;
                const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
                state.totalItems = totalItems; // <-- Update the totalItems
                state.error = null;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addProductToCart.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.items;
                state.totalCost = action.payload.totalCost;
                const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
                state.totalItems = totalItems; // <-- Update the totalItems
                state.error = null;
            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default cartSlice.reducer;
