import { configureStore } from "@reduxjs/toolkit";
import couterReducer from "./couter/couter";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/auth";
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
  key: "root",
  version: 1,
  storage,
  whitelist: ["app"],
};

const rootReducer = combineReducers({
  counter: couterReducer,
  auth:authReducer
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
