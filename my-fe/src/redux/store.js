import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/auth";
import systermReducer from "./systerm/systerm";
import questionReducer from "./question/question";
import fileReducer from "./file/file";
import topicReducer from "./topic/topic";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// cofig reduxStore + Persit

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  auth:authReducer,
  systerm:systermReducer,
  question:questionReducer,
  file:fileReducer,
  topic:topicReducer

});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
