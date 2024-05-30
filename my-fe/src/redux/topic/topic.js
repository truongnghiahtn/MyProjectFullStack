import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/customAxios";
import { toast } from "react-toastify";
const initialState = {
  listTopic: [],
  isLoading: false,
  error: "",
  status: null,
};

const setStatusFetch = (state, action, istoast = true) => {
  state.isLoading = false;
  if (action.payload) {
    if (
      action.payload &&
      (action?.payload?.status === "fail" ||
        action?.payload?.status === "error")
    ) {
      state.error = action.payload.message;
      state.status = false;
      istoast && toast.error(action?.payload?.message);
    } else {
      state.status = true;
      istoast && toast.success(action?.payload?.message);
    }
  }
};

export const getAllTopic = createAsyncThunk(
  "topic/getAllTopic",
  async (payload, thunkAPI) => {
    try {
      const result = await axios.get(`topic`, {
        withCredentials: true,
      });
      if (result) {
        console.log(result);
        return result;
      }
    } catch (error) {}
  }
);

export const topic = createSlice({
  name: "topic",
  initialState,
  reducers: {
    setIsLoadingTopic: (state) => {
      state.isLoading = true;
      state.error = "";
      state.status = null;
    },
    setDefaultTopic: (state) => {
      state.error = "";
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getAllTopic.fulfilled, (state, action) => {
      setStatusFetch(state, action);
      state.listTopic = action?.payload?.data?.data;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setIsLoadingTopic, setDefaultTopic } = topic.actions;

export default topic.reducer;
