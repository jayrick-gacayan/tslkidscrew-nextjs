import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AdminUsersState } from "./admin-users-state";
import { fieldInputValue } from "@/types/helpers/field-input-value";
import { RequestStatus } from "@/types/enums/request-status";
import * as  Joi from "joi";
import { ValidationType } from "@/types/enums/validation-type";

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
          isSuperAdmin: action.payload
        }
      }
    },
    adminUserFormSubmitted: (state: AdminUsersState) => {
      let { email, name } = state.adminUserForm;
      const adminUserSchema = Joi.object({
        email: Joi.string()
          .email({ tlds: { allow: false } })
          .required()
          .messages({
            "string.empty": "Email is required.",
            "string.email": "Email is in invalid format.",
            "any.required": "Email is required",
          }),
        name: Joi.string()
          .required()
          .messages({
            "string.empty": "Name is required.",
            "any.required": "Name is required",
          })
      });


      let validate = adminUserSchema.validate({
        email: email.value,
        name: name.value
      }, { abortEarly: false });

      let errors: any = validate.error?.details.reduce((prev, curr) => {
        return Object.assign({
          [curr.context?.key ?? '']: {
            value: curr.context?.value,
            errorText: curr.message,
            validationStatus: ValidationType.ERROR,
          }
        }, prev)
      }, {});

      return {
        ...state,
        adminUserForm: {
          ...state.adminUserForm,
          email: errors ? errors?.email : {
            ...state.adminUserForm.email,
            validationStatus: ValidationType.VALID
          },
          name: errors ? errors?.name : {
            ...state.adminUserForm.name,
            validationStatus: ValidationType.VALID
          },
          requestStatus: errors ? RequestStatus.FAILURE : RequestStatus.IN_PROGRESS
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
    editAdminUserFields: (state, action: PayloadAction<any>) => {

      return {
        ...state,
        adminUserForm: {
          ...state.adminUserForm,
          email: fieldInputValue<string>(action.payload.email),
          name: fieldInputValue<string>(action.payload.name),
          isActive: action.payload.isActive,
          isSuperAdmin: action.payload.isSuperAdmin,
          id: action.payload.id
        }
      }
    },
    adminUserFormReset: (state: AdminUsersState) => {
      return { ...state, adminUserForm: adminFormInitValues };
    },
    modalFormOpenStateSet: (state: AdminUsersState, action: PayloadAction<boolean>) => {
      return { ...state, modalForm: { ...state.modalForm, open: action.payload } }
    },
    modalFormTypeSet: (state: AdminUsersState, action: PayloadAction<string>) => {
      return { ...state, modalForm: { ...state.modalForm, type: action.payload } }
    }
  },
});

export const {
  adminUserFormReset,
  adminUserEmailChanged,
  adminUserNameChanged,
  adminUserIsActiveChanged,
  adminUserIsSuperAdminChanged,
  adminUserRequestStatusSet,
  editAdminUserFields,
  adminUserFormSubmitted,
  modalFormOpenStateSet,
  modalFormTypeSet
} = adminUsersSlice.actions;

export default adminUsersSlice.reducer;