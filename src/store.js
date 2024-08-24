import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";

const isDevelopment = window.location.hostname === "localhost";

export const store = configureStore({
  reducer: {
    userState: userReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
  devTools: isDevelopment,
});
