import { fieldInputValue } from "@/types/helpers/field-input-value";
import { AdminSettingsState } from "./admin-settings-state";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SummerCampWeekSetting } from "@/models/summer-week-setting";
import { RequestStatus } from "@/types/enums/request-status";
import * as  Joi from "joi";
import { ValidationType } from "@/types/enums/validation-type";

const summerCampWeekSettingInitValues = {
  name: fieldInputValue<string>(''),
  startDate: null,
  capacity: fieldInputValue<string>(''),
  notes: '',
  week: 'week-1',
  requestStatus: RequestStatus.NONE,
  enabled: false,
}

const initialState: AdminSettingsState = {
  summerCampWeekSetting: summerCampWeekSettingInitValues
}

const adminSettingsSlice = createSlice({
  name: 'adminSettings',
  initialState,
  reducers: {
    // for summer camp week setting
    summerCampWeekSettingNameChanged: (state: AdminSettingsState, action: PayloadAction<string>) => {
      return {
        ...state,
        summerCampWeekSetting: {
          ...state.summerCampWeekSetting,
          name: fieldInputValue<string>(action.payload),
        }
      }
    },
    summerCampWeekSettingWeekChanged: (state: AdminSettingsState, action: PayloadAction<string>) => {
      return {
        ...state,
        summerCampWeekSetting: {
          ...state.summerCampWeekSetting,
          week: action.payload,
        }
      }
    },
    summerCampWeekSettingCapacityChanged: (state: AdminSettingsState, action: PayloadAction<string>) => {
      return {
        ...state,
        summerCampWeekSetting: {
          ...state.summerCampWeekSetting,
          capacity: fieldInputValue<string>(action.payload),
        }
      }
    },
    summerCampWeekSettingFilled: (state: AdminSettingsState, action: PayloadAction<Partial<SummerCampWeekSetting>>) => {
      return {
        ...state,
        summerCampWeekSetting: {
          ...state.summerCampWeekSetting,
          name: fieldInputValue<string>(action.payload.name ?? ''),
          capacity: fieldInputValue<string>(action.payload.capacity?.toString() ?? ''),
          startDate: action.payload.start_date,
          notes: action.payload.notes ?? '',
          enabled: action.payload.enabled ?? false
        }
      }
    },
    summerCampWeekSettingStartDateSet: (state: AdminSettingsState, action: PayloadAction<string | undefined | null>) => {
      return {
        ...state,
        summerCampWeekSetting: {
          ...state.summerCampWeekSetting,
          startDate: action.payload
        }
      }
    },
    summerCampWeekSettingEnabledSet: (state: AdminSettingsState, action: PayloadAction<boolean>) => {
      return {
        ...state,
        summerCampWeekSetting: {
          ...state.summerCampWeekSetting,
          enabled: action.payload
        }
      }
    },
    summerCampWeekSettingNotesSet: (state: AdminSettingsState, action: PayloadAction<string>) => {
      return {
        ...state,
        summerCampWeekSetting: {
          ...state.summerCampWeekSetting,
          notes: action.payload
        }
      }
    },
    summerCampWeekSettingRequestStatusSet: (state: AdminSettingsState, action: PayloadAction<RequestStatus>) => {
      return {
        ...state,
        summerCampWeekSetting: {
          ...state.summerCampWeekSetting,
          requestStatus: action.payload
        }
      }
    },
    summerCampWeekSettingFormSubmit: (state: AdminSettingsState) => {
      let { name, capacity } = state.summerCampWeekSetting;

      let summerCampWeekSettingSchema = Joi.object({
        name: Joi.string()
          .required()
          .messages({
            'string.empty': 'Week name is required.',
            'any.required': 'Week name is required.'
          }),
        capacity: Joi.string()
          .required()
          .pattern(/^\d+$/)
          .messages({
            'string.empty': 'Week capacity is required.',
            'any.required': 'Week capacity is required.',
            'string.pattern.base': `Week capacity must be numeric.`
          })
      })

      let validate = summerCampWeekSettingSchema.validate({
        name: name.value,
        capacity: capacity.value,
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

      console.log('errors', errors)

      return {
        ...state,
        summerCampWeekSetting: {
          ...state.summerCampWeekSetting,
          name: errors?.name ? errors?.name : {
            ...state.summerCampWeekSetting.name,
            validationStatus: ValidationType.VALID
          },
          capacity: errors?.capacity ? errors?.capacity : {
            ...state.summerCampWeekSetting.capacity,
            validationStatus: ValidationType.VALID
          },
          requestStatus: errors ? RequestStatus.FAILURE : RequestStatus.IN_PROGRESS
        }
      }

    }
  },
});

export const {
  // for summer camp week settings
  summerCampWeekSettingWeekChanged,
  summerCampWeekSettingNameChanged,
  summerCampWeekSettingCapacityChanged,
  summerCampWeekSettingFilled,
  summerCampWeekSettingStartDateSet,
  summerCampWeekSettingNotesSet,
  summerCampWeekSettingRequestStatusSet,
  summerCampWeekSettingEnabledSet,
  summerCampWeekSettingFormSubmit,


} = adminSettingsSlice.actions

export default adminSettingsSlice.reducer;


