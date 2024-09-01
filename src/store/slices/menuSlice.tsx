import { createSlice } from "@reduxjs/toolkit";

export interface MenuState {
  open: boolean;
}

const initialState: MenuState = {
  open: false,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setOpen: (state) => {
      state.open = !open;
    },
  },
});

export const { setOpen } = menuSlice.actions;

export default menuSlice.reducer;
