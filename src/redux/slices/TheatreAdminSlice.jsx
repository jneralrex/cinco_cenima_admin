import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../utils/AxiosInstance";
import { decryptId } from "../../utils/Crypto";

const initialState = {
  loading: false,
  theatres: [],
  total: "",
  error: "",
};

export const getAllTheatreAdmin = createAsyncThunk(
  "theatre/getAllTheatreAdmin",
  async ({ loggedAdmin }, { rejectWithValue }) => {
    try {
      const res = await Api.get(`theatre/theatres?cinemaId=${loggedAdmin}`);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createTheatreAdmin = createAsyncThunk(
  "theatre/createTheatreAdmin",
  async ({ formData, loggedAdmin }, { rejectWithValue }) => {
    try {
      console.log(formData);
      console.log(loggedAdmin);
      const res = await Api.post(`theatre/theatres/${loggedAdmin}`, formData);

      console.log(res);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteTheatre = createAsyncThunk(
  "theatre/deleteTheatre",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const decryptedId = decryptId(userId);
      await Api.delete(`theatre/theatres/${decryptedId}`, {
        withCredentials: true,
      });
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const viewSelectedTheatre = createAsyncThunk("users/viewSelectedUser", async(userId, {rejectWithValue})=>{
  try {
      const decryptedId = decryptId(userId);
      const res = await Api.get(`theatre/theatres/${decryptedId}`, { withCredentials: true });
      return res.data;
  } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
  }
});

const theatreAdminSlice = createSlice({
  name: "theatre",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTheatreAdmin.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getAllTheatreAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.theatres = action.payload.theatres;
        state.total = action.payload.total;
        state.error = "";
      })
      .addCase(getAllTheatreAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTheatre.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteTheatre.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(deleteTheatre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default theatreAdminSlice.reducer;
