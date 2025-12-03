import { configureStore } from "@reduxjs/toolkit";
import { shubhamDevApi } from "./features/shubamdevApi";

export const store = configureStore({
  reducer: {
    
    [shubhamDevApi.reducerPath]: shubhamDevApi.reducer
   
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shubhamDevApi.middleware),
});