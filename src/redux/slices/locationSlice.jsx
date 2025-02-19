import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../utils/AxiosInstance";

const initialState = {
  loading: false,
  locations: [],
  singleLocation: "",
  currentPage: 1,
  totalPages: 0,
  totalLocation: 0,
  error: "",
};

export const getAllLocation = createAsyncThunk(
    "locations/getAllLocation",
    async ({ page = 1, limit = 10 , loggedAdmin}, { rejectWithValue }) => {
      try {
        const res = await Api.get(
          `location/locations/${loggedAdmin}?page=${page}&limit=${limit}`
        );
        console.log(res.data)
        if (res.data.success) {
          return res.data;
        }
        throw new Error("Invalid response structure");
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);

      }
    }
);

export const createLocation = createAsyncThunk(
  "locations/createLocation",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await Api.post(`location/create-location`, credentials);
      if(res.data.success){
        return res.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const editState = createAsyncThunk(
    "locations/editState",
    async (credentials, { rejectWithValue }) => {
      try {
        const res = await Api.put(`location/state`, credentials);
        if (res.data.success) {
            return res.data;
        }
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );
  
  export const editCity = createAsyncThunk(
    "locations/editCity",
    async (credentials, { rejectWithValue}) => {
      try {
        const res = await Api.put(`location/city`, credentials); 
        if (res.data.success) {
        return res.data;
        }
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );
  
  export const deleteState = createAsyncThunk(
    "locations/deleteState",
    async (selectedState, { rejectWithValue }) => {
      try {
        const res = await Api.delete(`location/state/${selectedState}`);
        if (res.data.success) {
          return res.data;
        }
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );
  
  export const deleteCity = createAsyncThunk("locations/deleteCity", async({selectedState, selectedCity}, {rejectWithValue})=>{
    try {
      const res = await Api.delete(`location/city/${selectedState}/${selectedCity}`);
      if (res.data.success) {
        return res.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const viewState = createAsyncThunk("locations/viewState", async (selectedState, { rejectWithValue }) => {
  try {
    const res = await Api.get(`location/location/${selectedState}`);
    console.log("API Response:", res.data); 
      return res.data 
  } catch (error) {
    console.error("Error in viewState:", error);
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});



  const locationSlice = createSlice({
    name: "locations",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createLocation.pending, (state) => {
          state.loading = true;
          state.error = "";
        })
        .addCase(createLocation.fulfilled, (state, action) => {
          state.loading = false;
          state.singleLocation = action.payload;
          state.error = "";
        })
        .addCase(createLocation.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(getAllLocation.pending, (state) => {
          state.loading = true;
          state.error = "";
        })
        .addCase(getAllLocation.fulfilled, (state, action) => {
          state.loading = false;
          const { locations, currentPage, totalPages, totalLocation } = action.payload;
          state.locations = locations;
          state.currentPage = currentPage;
          state.totalPages = totalPages;
          state.totalLocation = totalLocation;
          state.error = "";
        })
        .addCase(getAllLocation.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(editState.pending, (state) => {
            state.loading = true;
            state.error = "";
          })
          .addCase(editState.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
          })
          .addCase(editState.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(editCity.pending, (state) => {
            state.loading = true;
            state.error = "";
          })
          .addCase(editCity.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
          })
          .addCase(editCity.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(deleteState.pending, (state) => {
            state.loading = true;
            state.error = "";
          })
          .addCase(deleteState.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
          })
          .addCase(deleteState.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(deleteCity.pending, (state) => {
            state.loading = true;
            state.error = "";
          })
          .addCase(deleteCity.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
          })
          .addCase(deleteCity.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(viewState.pending, (state) => {
            state.loading = true;
            state.error = "";
          })
          .addCase(viewState.fulfilled, (state, action) => {
            state.loading = false;
            state.singleLocation = action.payload; 
            state.error = "";
          })          
          .addCase(viewState.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          
    },
  });
  
  export default locationSlice.reducer;