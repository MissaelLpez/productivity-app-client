import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./slices/filtersSlice";
import menuReducer from "./slices/menuSlice";
import modalReducer from "./slices/modalSlice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    modals: modalReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
