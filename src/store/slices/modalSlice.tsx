import { Task } from "@/vite-env";
import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  openCreateTask: boolean;
  openEditTask: boolean;
  openTask: boolean;
  task: Task | null;
}

const initialState: ModalState = {
  openCreateTask: false,
  openEditTask: false,
  openTask: false,
  task: null,
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
    setOpenTask: (state, { payload }) => {
      state.task = payload;
      state.openTask = !state.openTask;
    },
  },
});

export const { setOpenCreateTask, setOpenEditTask, setOpenTask } =
  modalSlice.actions;

export default modalSlice.reducer;
