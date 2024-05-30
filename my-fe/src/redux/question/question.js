import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/customAxios";
import axios1 from "axios";
import { toast } from "react-toastify";
const initialState = {
  listQuestion: [],
  // param:"",
  isLoading: false,
  error: "",
  status: null,
  total: 100,
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

export const getAllQuestion = createAsyncThunk(
  "question/getAllQuestion",
  async (payload, thunkAPI) => {
    try {
      const result = await axios.get(`questions${payload.param}`, {
        withCredentials: true,
      });
      if (result) {
        const newData = result.data.data.map((item, index) => {
          item.index = payload.pageSize * (payload.page - 1) + index + 1;
          return item;
        });
        return { data: newData, total: result.results };
      }
    } catch (error) {}
  }
);

export const createQuestion = createAsyncThunk(
  "question/createQuestion",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(
        "questions",
        { ...payload.data },
        {
          withCredentials: true,
        }
      );
      if (data) {
        if (data.status === "success") {
          const { param } = payload;
          thunkAPI.dispatch(
            getAllQuestion({
              param: param.param,
              pageSize: param.pageSize,
              page: param.page,
            })
          );
        }

        return data;
      }
    } catch (error) {}
  }
);
export const updateQuestion = createAsyncThunk(
  "question/updateQuestion",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.patch(
        `questions/${payload.id}`,
        { ...payload.data },
        {
          withCredentials: true,
        }
      );
      if (data) {
        if (data.status === "success") {
          const { param } = payload;
          thunkAPI.dispatch(
            getAllQuestion({
              param: param.param,
              pageSize: param.pageSize,
              page: param.page,
            })
          );
        }

        return data;
      }
    } catch (error) {}
  }
);

export const deleteQuestion = createAsyncThunk(
  "question/deleteQuestion",
  async (payload, thunkAPI) => {
    try {
      const data = await axios1.delete(`http://localhost:8100/api/v1/questions/${payload.id}`, {
        withCredentials: true,
      });
      if (data.status) {
        if (data.status === 204) {
        const { param } = payload;
          thunkAPI.dispatch(
            getAllQuestion({
              param: param.param,
              pageSize: param.pageSize,
              page: param.page,
            })
          );
        }

        return data.status;
      }
    } catch (error) {}
  }
);

export const question = createSlice({
  name: "question",
  initialState,
  reducers: {
    setIsLoadingQuestion: (state) => {
      state.isLoading = true;
      state.error = "";
      state.status = null;
    },
    setDefaultQuestion: (state) => {
      state.error = "";
      state.status = null;
    },
    // setParamQuestion:(state)=>{

    // }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(getAllQuestion.fulfilled, (state, action) => {
        setStatusFetch(state, action);
        state.listQuestion = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        setStatusFetch(state, action);
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        setStatusFetch(state, action);
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        if ((action.payload === 204)) {
          state.status = true;
          toast.success("Question has been successfully deleted");
        }else{
          state.status = false;
          toast.error("Error while deleting question");
        }
        setStatusFetch(state, action);
      });
  },
});

// Action creators are generated for each case reducer function
export const { setIsLoadingQuestion, setDefaultQuestion } = question.actions;

export default question.reducer;
