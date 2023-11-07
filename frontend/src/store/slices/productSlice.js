import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllProducts } from '../../utility/productAPI';

// Async action to fetch products from backend
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await getAllProducts();
    const data = await response.json();
    return data;
});

const productSlice = createSlice({
    name: 'products',
    initialState: { items: [], status: 'idle', error: null },
    reducers: {},
    extraReducers: {
        [fetchProducts.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload;
        },
        [fetchProducts.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },
    },
});

export default productSlice.reducer;
