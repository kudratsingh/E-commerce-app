// frontend/src/redux/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser } from '../../utility/userAPI';  // We'll create this API function next

const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        console.log("Login response 4:", action.payload);
        if (action.payload.token) {
            localStorage.setItem('userToken', action.payload.token);
        }
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.userInfo = null;
        state.error = action.payload;
    });
  },
});

export const login = createAsyncThunk(
    'user/login',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await loginUser(userData);
        if (response.error) {
            throw new Error(response.error);
        }
        console.log("Login response 3:", response);
        return response;
      } catch (err) {
        console.error("Error during login:", err.message);
        return rejectWithValue("Login failed: " + err.message);
      }    
    }
  );

export const { logout } = userSlice.actions;

export default userSlice.reducer;
