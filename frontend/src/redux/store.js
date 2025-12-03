import { configureStore } from "@reduxjs/toolkit";
import { shubhamDevApi } from "./features/shubamdevApi";
import { adminApi } from "./features/adminApi";

export const store = configureStore({
  reducer: {
    [shubhamDevApi.reducerPath]: shubhamDevApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(shubhamDevApi.middleware)
      .concat(adminApi.middleware),
});