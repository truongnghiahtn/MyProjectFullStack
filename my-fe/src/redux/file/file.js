import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/customAxios";
import { toast } from "react-toastify";
const initialState = {
  listFile: [],
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

export const getAllFile = createAsyncThunk(
  "file/getAllFile",
  async (payload, thunkAPI) => {
    try {
      const result = await axios.get(`files`, {
        withCredentials: true,
      });
      if (result) {
        console.log(result);
        return result;
      }
    } catch (error) {}
  }
);
export const createFile = createAsyncThunk(
  "file/createFile",
  async (payload, thunkAPI) => {
    try {
      const result = await axios.post(`files`,payload, {
        withCredentials: true,
      });
      if (result) {
        if(result.status==="success"){
          thunkAPI.dispatch(getAllFile());
        }
        return result;
      }
    } catch (error) {}
  }
);

export const createFileDriver = createAsyncThunk(
  "file/createFileDriver",
  async (payload, thunkAPI) => {
    try {
      const result = await axios.post(`files/createFileDriver`,payload, {
        withCredentials: true,
      });
      if (result) {
        console.log(result);
        if(result.status==="success"){
          thunkAPI.dispatch(getAllFile());
        }
        return result;
      }
    } catch (error) {}
  }
);

export const file = createSlice({
  name: "file",
  initialState,
  reducers: {
    setIsLoadingFile: (state) => {
      state.isLoading = true;
      state.error = "";
      state.status = null;
    },
    setDefaultFile: (state) => {
      state.error = "";
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getAllFile.fulfilled, (state, action) => {
      setStatusFetch(state, action);
      state.listFile = action.payload.data.data;
    })
    .addCase(createFile.fulfilled, (state, action) => {
      setStatusFetch(state, action);
    })
    .addCase(createFileDriver.fulfilled, (state, action) => {
      setStatusFetch(state, action);
    });
  },
});

// Action creators are generated for each case reducer function
export const { setIsLoadingFile, setDefaultFile } = file.actions;

export default file.reducer;
