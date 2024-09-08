import { createSlice } from "@reduxjs/toolkit";

export interface FilterState {
  inProgressFilter: "all" | "short" | "medium" | "long";
  completedFilter: "all" | "short" | "medium" | "long";
}

const initialState: FilterState = {
  inProgressFilter: "all",
  completedFilter: "all",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setInProgressFilter: (state, { payload }) => {
      console.log(payload);

      state.inProgressFilter = payload;
    },
    setCompletedFilter: (state, { payload }) => {
      state.completedFilter = payload;
    },
  },
});

export const { setInProgressFilter, setCompletedFilter } = filterSlice.actions;

export default filterSlice.reducer;
