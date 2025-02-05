import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../utils/AxiosInstance";
import { decryptId } from "../../utils/Crypto";

const initialState = {
  loading: false,
  events: [],
  singleEvent: "",
  error: "",
};

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async ({payload, loggedAdmin}, { rejectWithValue }) => {
    try {
      const res = await Api.post(`event/create-event/${loggedAdmin}`, payload);
      console.log("response", res);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something occured, please try again"
      );
    }
  }
);

export const vieweEvent = createAsyncThunk(
  "events/vieweEvent",
  async ({ eventId }, { rejectWithValue }) => {
    try {
      const decryptedId = decryptId(eventId);
      const res = await Api.get(`event/single-event/${decryptedId}`);
      console.log("event",res.data.event)
      return res.data.event;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something occurred, please try again"
      );
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async ({ eventId }, { rejectWithValue }) => {
    try {
      const decryptedId = decryptId(eventId);
      await Api.delete(`event/delete-event/${decryptedId}`);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something occurred, please try again"
      );
    }
  }
);

export const getEvents = createAsyncThunk(
  "events/getEvents",
  async (loggedAdmin , { rejectWithValue }) => {
    try {
      const res = await Api.get(`event/events/${loggedAdmin}`);
      if (Array.isArray(res.data.events)) {
        return res.data.events;
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something occured, please try again"
      );
    }
  }
);


export const editEvent = createAsyncThunk(
  "events/editEvent",
  async ({ eventId, eventData, loggedAdmin }, { rejectWithValue }) => {
    try {
      const decryptedId = decryptId(eventId);
      const res = await Api.patch(`event/edit-event/${decryptedId}/${loggedAdmin}`, eventData);
      console.log("event",res.data.event)
      return res.data.event;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something occurred, please try again"
      );
    }
  }
);


const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.events.push(action.payload);
      })      
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getEvents.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
        state.error = "";
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(vieweEvent.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(vieweEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.singleEvent = action.payload;
        state.error = "";
      })
      .addCase(vieweEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editEvent.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(editEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(editEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteEvent.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default eventSlice.reducer;
