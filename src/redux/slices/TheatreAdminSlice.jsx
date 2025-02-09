import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../utils/AxiosInstance";

const initialState = {
  loading: false,
  theatres: [],
  error: "",
};

export const getAllTheatreAdmin = createAsyncThunk(
  "theatreAdmin/getAllTheatreAdmin",
  async ({loggedAdmin},{ rejectWithValue }) => {
    try {
      const res = await Api.get(`theatre/theatres?cinemaId=${loggedAdmin}`);
      return res.data.theatres;

      // if (res.data.theatre.role === "web-admin") {
      //   return {
      //     theatreAdmins: res.data.users,
      //   };
      // }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createTheatreAdmin = createAsyncThunk("theatreAdmin/createTheatreAdmin", async( {formData, loggedAdmin}, {rejectWithValue})=>{
try {
    const res = await Api.post(`theatre/theatres/${loggedAdmin}`, formData);
    console.log(formData)
    console.log(loggedAdmin)
    console.log(res)
    
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
        state.theatres = action.payload;
        state.error = "";
      })
      .addCase(getAllTheatreAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default theatreAdminSlice.reducer;
