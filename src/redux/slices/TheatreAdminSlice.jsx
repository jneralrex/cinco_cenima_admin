import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../utils/AxiosInstance";

const initialState = {
  loading: false,
  theatreAdmins: [],
  createdTheatreAdmin: null,
  error: "",
};

export const getAllTheatreAdmin = createAsyncThunk(
  "theatreAdmin/getAllTheatreAdmin",
  async ({ rejectWithValue }) => {
    try {
      const res = await Api.get("/user/all-user");
      if (res.data.users.role === "web-admin") {
        return {
          theatreAdmins: res.data.users,
        };
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createTheatreAdmin = createAsyncThunk("theatreAdmin/createTheatreAdmin", async( creadentials, {rejectWithValue})=>{
try {
    const res = await Api.post("auth/web-admin/signup", creadentials);
    if (res.data.success) {
        return {
          theatreAdmins: res.data.user,
        };
      }
    
} catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
}
});

const theatreAdminSlice = createSlice({
  name: "theatre-admin",
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
        state.theatreAdmins = action.payload;
        state.error = "";
      })
      .addCase(getAllTheatreAdmin.rejected, (state, action) => {
        state.loading = false;
        state.theatreAdmins = [];
        state.error = action.payload;
      })
  },
});

export default theatreAdminSlice.reducer;
