import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Api from "../../utils/AxiosInstance";
import { decryptId } from "../../utils/Crypto";


const initialState = {
    loading: false,
    ads:[],
    singleAds:null,
    error:"",
    total: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 10,
};


export const getAllAds = createAsyncThunk("ads/getAllAds", async(_,{rejectWithValue})=>{
    try {
        const res = await Api.get(`ads/all-advertisements `)
        console.log(res)
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const createAds = createAsyncThunk("ads/createAds", async (formData, { rejectWithValue }) => {
    try {
      const res = await Api.post(`ads/create-advertisement`, formData);
      console.log("Payload Sent to API:", formData);
      console.log(res)
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  });
 
  
  export const editAds = createAsyncThunk("ads/editAds", async({adsId, adsData}, {rejectWithValue})=>{
    try {
        const decryptedId = decryptId(adsId)
        const res = await Api.put(`ads/edit-advertisement/${decryptedId}`, adsData);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
  });

  export const deleteAds = createAsyncThunk("ads/deleteAds", async({adsId}, {rejectWithValue})=>{
    try {
        const decryptedId = decryptId(adsId)
        const res = await Api.delete(`ads/delete-advertisement/${decryptedId}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
  });

  export const activateAds = createAsyncThunk("ads/activateAds", async({adsId}, {rejectWithValue})=>{
    try {
        const decryptedId = decryptId(adsId)
        const res = await Api.put(`ads/activate-advertisement/${decryptedId}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
  });

  export const deActivateAds = createAsyncThunk("ads/deActivateAds", async({adsId}, {rejectWithValue})=>{
    try {
        const decryptedId = decryptId(adsId)
        const res = await Api.put(`ads/activate-advertisement/${decryptedId}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
  }); 
  
  export const viewSingleAds = createAsyncThunk("ads/singleAds", async({adsId}, {rejectWithValue})=>{
    try {
        const decryptedId = decryptId(adsId)
        const res = await Api.get(`ads/single-advertisement/${decryptedId}`);
        console.log(res)
        return res.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
  });

const adsSlice = createSlice({
    name:"ads",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllAds.pending, (state)=>{
            state.loading = true;
            state.error =""
        })
        .addCase(getAllAds.fulfilled, (state, action)=>{
            state.loading = false;
            state.ads = action.payload.allAds;
            state.error = ""
        })
        .addCase(getAllAds.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(createAds.pending, (state)=>{
            state.loading = true;
            state.error =""
        })
        .addCase(createAds.fulfilled, (state, action)=>{
            state.loading = false;
            state.error = ""
        })
        .addCase(createAds.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(editAds.pending, (state)=>{
            state.loading = true;
            state.error =""
        })
        .addCase(editAds.fulfilled, (state, action)=>{
            state.loading = false;
            state.error = ""
        })
        .addCase(editAds.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deleteAds.pending, (state)=>{
            state.loading = true;
            state.error =""
        })
        .addCase(deleteAds.fulfilled, (state, action)=>{
            state.loading = false;
            state.error = ""
        })
        .addCase(deleteAds.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(activateAds.pending, (state)=>{
            state.loading = true;
            state.error =""
        })
        .addCase(activateAds.fulfilled, (state, action)=>{
            state.loading = false;
            state.error = ""
        })
        .addCase(activateAds.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deActivateAds.pending, (state)=>{
            state.loading = true;
            state.error =""
        })
        .addCase(deActivateAds.fulfilled, (state, action)=>{
            state.loading = false;
            state.error = ""
        })
        .addCase(deActivateAds.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(viewSingleAds.pending, (state)=>{
            state.loading = true;
            state.error =""
        })
        .addCase(viewSingleAds.fulfilled, (state, action)=>{
            state.loading = false;
            state.singleAds = action.payload;
            state.error = ""
        })
        .addCase(viewSingleAds.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    },

});

export default adsSlice.reducer;
 

