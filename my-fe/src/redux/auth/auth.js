import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/customAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const initialState = {
  auth: {
    username: "",
    role: "",
    email: "",
    photo: "",
  },
  isAuthenticated: false,
  isLoading: false,
  error: "",
  status: null,
};

export const postRegister = createAsyncThunk(
  "users/register",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post("users/signup", { ...payload });
      if (data) {
        return data;
      }
    } catch (error) {}
  }
);

export const postLogin = createAsyncThunk(
  "users/login",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post("users/login", { ...payload });
      if (data) {
        return data;
      }
    } catch (error) {}
  }
);

export const postActiveUser = createAsyncThunk(
  "users/activeUser",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post("users/active", { ...payload });
      if (data) {
        return data;
      }
    } catch (error) {
    }
  }
);

const setDefault = (state, action) => {
  state.isLoading = false;
  if (action.payload) {
    if (
      action.payload &&
      (action?.payload?.status === "fail" ||
        action?.payload?.status === "error")
    ) {
      state.error = action.payload.message;
      state.status = false;
      toast.error(action?.payload?.message);
    } else {
      state.status = true;
      toast.success(action?.payload?.message);
    }
  }
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoadingAuth: (state) => {
      state.isLoading = true;
      state.error = "";
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(postRegister.fulfilled, (state, action) => {
        setDefault(state, action);
      })
      .addCase(postActiveUser.fulfilled, (state, action) => {
        setDefault(state, action);
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        setDefault(state, action);
      });
  },
});

// Action creators are generated for each case reducer function
export const { setIsLoadingAuth } = auth.actions;

export default auth.reducer;
