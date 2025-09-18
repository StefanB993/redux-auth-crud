import { persistReducer, persistStore } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice/authSlice";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { friendsApi } from "./api/friendsApi";
import { modalReducer } from "./api/modalSlice/modalSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  [friendsApi.reducerPath]: friendsApi.reducer,
  modal: modalReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(friendsApi.middleware),
});

export const persistor = persistStore(store);
export * from "./authSlice/authSlice";
