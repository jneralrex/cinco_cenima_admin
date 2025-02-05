import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../utils/AxiosInstance";
import { decryptId } from "../../utils/Crypto";

const initialState = {
  loading: false,
  users: [],
  error: "",
  currentPage: 1,
  totalPages: 1,
  totalUsers: 0,
  singleUser: null,
};

export const getAllUser = createAsyncThunk(
  "users/getAllUser",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const res = await Api.get(`/user/all-users`, {
        params: { page, limit },
      });

      if (res.data.success) {
        return {
          users: res.data.users,
          currentPage: res.data.currentPage,
          totalPages: res.data.totalPages,
          totalUsers: res.data.totalUsers,
        };
      }

      return rejectWithValue("Invalid response format");
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async ({ userId, page, limit }, { rejectWithValue, dispatch }) => {
    try {
        const decryptedId = decryptId(userId);
        await Api.delete(`/user/delete/${decryptedId}`, { withCredentials: true });
      dispatch(getAllUser({ page, limit }));
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const viewSelectedUser = createAsyncThunk("users/viewSelectedUser", async(userId, {rejectWithValue})=>{
    try {
        const decryptedId = decryptId(userId);
        const res = await Api.get(`/user/individual-user/${decryptedId}`, { withCredentials: true });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const editUser = createAsyncThunk(
  "users/editUser",
  async ({ userId, userData, page, limit }, { rejectWithValue, dispatch }) => {
    try {
        const decryptedId = decryptId(userId);

      await Api.patch(`/user/individual-user/${decryptedId}`, userData);

      dispatch(getAllUser({ page, limit }));
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);



const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalUsers = action.payload.totalUsers;
        state.error = "";
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.loading = false;
        state.users = [];
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(editUser.fulfilled, (state) => {
        state.loading = false;
        state.singleUser = action.payload;
        state.error = "";
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default userSlice.reducer;
