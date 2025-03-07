import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../utils/AxiosInstance";

const initialState = {
  loading: false,
  cinema: '',
  error: '',
};

export const loggWebAdmin = createAsyncThunk(
  'admin/loggWebAdmin',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await Api.post(`cinema/signin`, credentials,{ withCredentials: true });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const signUpWebAdmin = createAsyncThunk(
  'admin/signUpWebAdmin',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await Api.post(`cinema/signup`, credentials,{ withCredentials: true });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const logOut = createAsyncThunk(
  'admin/logOut',
  async (_, { rejectWithValue }) => {
    try {
      const res = await Api.post(`cinema/signout`, null, { withCredentials: true });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const webAdminSlice = createSlice({
  name: "web-admin",
  initialState, 
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loggWebAdmin.pending, (state) => {
        state.loading = true;
        state.error = ""; 
      })
      .addCase(loggWebAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.cinema = action.payload;
        state.error = "";
      })
      .addCase(loggWebAdmin.rejected, (state, action) => {
        state.loading = false;
        state.cinema = '';
        state.error = action.payload; 
      })
      .addCase(signUpWebAdmin.pending, (state) => {
        state.loading = true;
        state.error = ""; 
      })
      .addCase(signUpWebAdmin.fulfilled, (state, action) => { 
        state.loading = false;
        state.error = "";
      })
      .addCase(signUpWebAdmin.rejected, (state, action) => {
        state.loading = false;
        state.cinema = '';
        state.error = action.payload; 
      })
      .addCase(logOut.pending, (state) => {
        state.loading = true;
        state.error = ""; 
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(logOut.rejected, (state, action) => {
        state.loading = false;
        state.cinema = '';
        state.error = action.payload; 
      })
  },
});

export default webAdminSlice.reducer;
