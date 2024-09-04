import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  openCreateTask: boolean;
  openEditTask: boolean;
}

const initialState: ModalState = {
  openCreateTask: false,
  openEditTask: false,
};

export const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setOpenCreateTask: (state) => {
      state.openCreateTask = !state.openCreateTask;
    },
    setOpenEditTask: (state) => {
      state.openEditTask = !state.openEditTask;
    },
  },
});

export const { setOpenCreateTask, setOpenEditTask } = modalSlice.actions;

export default modalSlice.reducer;
