import { createSlice } from "@reduxjs/toolkit";

export interface MenuState {
  menuOpen: boolean;
}

const initialState: MenuState = {
  menuOpen: false,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setOpenMenu: (state) => {
      state.menuOpen = !state.menuOpen;
    },
  },
});

export const { setOpenMenu } = menuSlice.actions;

export default menuSlice.reducer;
