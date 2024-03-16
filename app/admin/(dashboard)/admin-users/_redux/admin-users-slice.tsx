import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AdminUsersState } from "./admin-users-state";
import { fieldInputValue } from "@/types/helpers/field-input-value";
import { Admin } from "@/models/admin";
import { InputProps } from "@/types/props/input-props";

const adminFormInitValues = {
  email: fieldInputValue<string>(''),
  name: fieldInputValue<string>(''),
  isActive: false,
  isSuperAdmin: false,
}

const initialState: AdminUsersState = {
  modalForm: { open: false, type: '' },
  adminUserForm: adminFormInitValues
}

const adminUsersSlice = createSlice({
  name: 'adminUsers',
  initialState,
  reducers: {
    adminInputFieldChanged: (
      state: AdminUsersState,
      action: PayloadAction<{ key: 'email' | 'name'; data: InputProps<string>; }>) => {
      let { key, data } = action.payload;

      return {
        ...state,
        adminUserForm: { ...state.adminUserForm, [key]: data }
      }
    },
    adminInputCheckboxFieldChanged: (
      state: AdminUsersState,
      action: PayloadAction<{ key: 'isActive' | 'isSuperAdmin'; data: boolean; }>) => {

      let { key, data } = action.payload;

      return {
        ...state,
        adminUserForm: { ...state.adminUserForm, [key]: data }
      }

    },
    editAdminUserFields: (state, action: PayloadAction<Partial<Admin>>) => {
      return {
        ...state,
        adminUserForm: {
          ...state.adminUserForm,
          email: fieldInputValue<string>(action.payload.email ?? ''),
          name: fieldInputValue<string>(action.payload.name ?? ''),
          isActive: action.payload.active ?? false,
          isSuperAdmin: action.payload.is_super_admin ?? false,
          id: action.payload.id
        }
      }
    },
    adminUserFormReset: (state: AdminUsersState) => {
      return { ...state, adminUserForm: adminFormInitValues };
    },
    modalFormOpened: (state: AdminUsersState, action: PayloadAction<boolean>) => {
      return { ...state, modalForm: { ...state.modalForm, open: action.payload } }
    },
    modalFormTypeSet: (state: AdminUsersState, action: PayloadAction<string>) => {
      return { ...state, modalForm: { ...state.modalForm, type: action.payload } }
    }
  },
});

export const {
  adminUserFormReset,
  adminInputFieldChanged,
  adminInputCheckboxFieldChanged,
  editAdminUserFields,
  modalFormOpened,
  modalFormTypeSet
} = adminUsersSlice.actions;

export default adminUsersSlice.reducer;