import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AdminUsersState } from "./admin-users-state";

const initialState: AdminUsersState = {
  modalForm: {
    open: false,
    type: ''
  }
}

const adminUsersSlice = createSlice({
  name: 'adminUsers',
  initialState,
  reducers: {
    modalFormOpened: (state: AdminUsersState, action: PayloadAction<{ open: boolean; type: string }>) => {
      return { ...state, modalForm: action.payload };
    }
  },
});

export const { modalFormOpened } = adminUsersSlice.actions;

export default adminUsersSlice.reducer;