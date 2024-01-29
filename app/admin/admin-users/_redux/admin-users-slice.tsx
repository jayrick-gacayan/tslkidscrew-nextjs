import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AdminUsersState } from "./admin-users-state";
import { fieldInputValue } from "@/types/helpers/field-input-value";
import { RequestStatus } from "@/types/enums/request-status";

const adminFormInitValues = {
  email: fieldInputValue<string>(''),
  name: fieldInputValue<string>(''),
  isActive: false,
  isSuperAdmin: false,
  requestStatus: RequestStatus.NONE
}

const initialState: AdminUsersState = {
  modalForm: {
    open: false,
    type: ''
  },
  adminUserForm: adminFormInitValues
}

const adminUsersSlice = createSlice({
  name: 'adminUsers',
  initialState,
  reducers: {
    modalFormOpened: (
      state: AdminUsersState,
      action: PayloadAction<{ open: boolean; type: string }>
    ) => {
      return { ...state, modalForm: action.payload };
    },
    adminUserEmailChanged: (state: AdminUsersState, action: PayloadAction<string>) => {
      return {
        ...state,
        adminUserForm: {
          ...state.adminUserForm,
          email: fieldInputValue(action.payload)
        }
      }
    },
    adminUserNameChanged: (state: AdminUsersState, action: PayloadAction<string>) => {
      return {
        ...state,
        adminUserForm: {
          ...state.adminUserForm,
          name: fieldInputValue(action.payload)
        }
      }
    },
    adminUserIsActiveChanged: (state: AdminUsersState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        adminUserForm: {
          ...state.adminUserForm,
          isActive: action.payload
        }
      }
    },
    adminUserIsSuperAdminChanged: (state: AdminUsersState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        adminUserForm: {
          ...state.adminUserForm,
          IsSuperAdmin: action.payload
        }
      }
    },
    adminUserRequestStatusSet: (state: AdminUsersState, action: PayloadAction<RequestStatus>) => {
      return {
        ...state,
        adminUserForm: {
          ...state.adminUserForm,
          requestStatus: action.payload
        }
      }
    },
    adminUserFormReset: (state: AdminUsersState) => {
      return { ...state, adminUserForm: adminFormInitValues };
    }
  },
});

export const {
  modalFormOpened,
  adminUserFormReset,
  adminUserEmailChanged,
  adminUserNameChanged,
  adminUserIsActiveChanged,
  adminUserIsSuperAdminChanged,
  adminUserRequestStatusSet
} = adminUsersSlice.actions;

export default adminUsersSlice.reducer;