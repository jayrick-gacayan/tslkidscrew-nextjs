import { LocationPlace } from "@/models/location-place";
import { fieldInputValue } from "@/types/helpers/field-input-value";
import { FillInFormState } from "./fill-in-form-state";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChildInfoType } from "@/types/input-types/child-info-type";
import { initChild } from "../_helpers/init-child";
import { InputProps } from "@/types/props/input-props";
import { ValidationType } from "@/types/enums/validation-type";

const initialState: FillInFormState = {
  stripeModalOpen: false,
  fillInForm: {
    location: fieldInputValue<Partial<LocationPlace> | undefined>(undefined),
    children: [initChild],
    defDateForChildForm: undefined,
    TOSCondition: fieldInputValue<any[]>([]),

    //for program type before-or-after-school
    yearCycle: fieldInputValue<string>(''),
    startDate: fieldInputValue<string | undefined>(new Date().toISOString()),
    beforeOrAfterWeekDays: fieldInputValue({
      beforeSchool: [],
      afterSchool: []
    }),

    // for program type summer-camp
    summerCampPackageReg: fieldInputValue(''),
    promoPackage: undefined
  }
}

const fillInFormSlice = createSlice({
  name: 'fillInForm',
  initialState,
  reducers: {
    modalStripeToggled: (state: FillInFormState, action: PayloadAction<boolean>) => {
      return { ...state, stripeModalOpen: action.payload }
    },
    locationChanged: (
      state: FillInFormState,
      action: PayloadAction<InputProps<Partial<LocationPlace> | undefined>>
    ) => {
      return {
        ...state,
        fillInForm: { ...state.fillInForm, location: action.payload }
      }
    },
    childrenAdded: (state: FillInFormState) => {
      return {
        ...state,
        fillInForm: { ...state.fillInForm, children: [...state.fillInForm.children, initChild] }
      }
    },
    childrenRemoved: (state: FillInFormState, action: PayloadAction<number>) => {
      return {
        ...state,
        fillInForm: {
          ...state.fillInForm,
          children: state.fillInForm.children.filter((val: ChildInfoType, idx: number) => {
            return idx !== action.payload
          })
        }
      }
    },
    childrenFieldUpdated: (
      state: FillInFormState,
      action: PayloadAction<{
        index: number;
        value: string;
        key: 'first_name' | 'last_name' | 'birthdate' | 'school_attending';
      }>
    ) => {
      let { index, key, value } = action.payload;

      return {
        ...state,
        fillInForm: {
          ...state.fillInForm,
          children: state.fillInForm.children.map((val: ChildInfoType, idx: number) => {
            return idx === index ? { ...val, [key]: value } : val
          })
        }
      }
    },
    tosConditionChanged: (
      state: FillInFormState,
      action: PayloadAction<InputProps<any[]>>
    ) => {
      return {
        ...state,
        fillInForm: { ...state.fillInForm, TOSCondition: action.payload }
      }
    },
    fillInFormReset: (state: FillInFormState) => { return initialState; },

    // for program-type 'before-or-after-school'
    yearCycleChanged: (
      state: FillInFormState,
      action: PayloadAction<InputProps<string>>
    ) => {
      return {
        ...state,
        fillInForm: { ...state.fillInForm, yearCycle: action.payload }
      }
    },
    beforeOrAfterSchoolStartDateChanged: (
      state: FillInFormState,
      action: PayloadAction<InputProps<string | undefined>>
    ) => {
      return {
        ...state,
        fillInForm: { ...state.fillInForm, startDate: action.payload }
      }
    },
    beforeOrAfterWeekDaysSet: (
      state: FillInFormState,
      action: PayloadAction<{
        key: 'beforeSchool' | 'afterSchool',
        value: any[]
      }>
    ) => {
      let { key, value } = action.payload;
      return {
        ...state,
        fillInForm: {
          ...state.fillInForm,
          beforeOrAfterWeekDays: fieldInputValue({
            ...state.fillInForm.beforeOrAfterWeekDays.value,
            [key]: value
          })
        }
      }
    },
    beforeOrAfterWeekDaysSetError: (
      state: FillInFormState,
      action: PayloadAction<{
        errorText: string;
        validationStatus: ValidationType
      }>
    ) => {
      let { errorText, validationStatus } = action.payload;

      return {
        ...state,
        fillInForm: {
          ...state.fillInForm,
          beforeOrAfterWeekDays: {
            ...state.fillInForm.beforeOrAfterWeekDays,
            errorText,
            validationStatus
          }
        }
      }
    },

    // for program-type 'summer-camp'
    summerCampPackageRegChanged: (
      state: FillInFormState,
      action: PayloadAction<InputProps<string>>
    ) => {
      return {
        ...state,
        fillInForm: { ...state.fillInForm, summerCampPackageReg: action.payload }
      }
    }
  }
})

export const {
  childrenAdded,
  childrenFieldUpdated,
  childrenRemoved,
  locationChanged,
  modalStripeToggled,
  fillInFormReset,
  tosConditionChanged,

  //for program type 'before-or-after-school'
  beforeOrAfterSchoolStartDateChanged,
  yearCycleChanged,
  beforeOrAfterWeekDaysSet,
  beforeOrAfterWeekDaysSetError,

  //for program type 'summer-camp'
  summerCampPackageRegChanged,

} = fillInFormSlice.actions;

export default fillInFormSlice.reducer;