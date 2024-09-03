import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  openCreateTask: boolean;
}

const initialState: ModalState = {
  openCreateTask: false,
};

export const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setOpenCreateTask: (state) => {
      state.openCreateTask = !state.openCreateTask;
    },
  },
});

export const { setOpenCreateTask } = modalSlice.actions;

export default modalSlice.reducer;
