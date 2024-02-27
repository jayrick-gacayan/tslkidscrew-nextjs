'use server';

import { auth } from "@/auth";
import { Admin } from "@/models/admin";
import { Session } from "next-auth";
import * as Joi from "joi";
import { ValidationType } from "@/types/enums/validation-type";
import {
  updateProgramYearCycleSetting,
  updateSummerCampSwimSetting,
  updateSummerCampWeekSetting
} from "@/services/program-settings-services";
import { Result } from "@/models/result";
import { ResultStatus } from "@/types/enums/result-status";
import { SummerCampWeekSettingFormStateProps } from "@/types/props/summer-camp-week-setting-form-state-props";
import { SummerCampSwimSettingFormStateProps } from "@/types/props/summer-camp-swim-setting-form-state-props";
import { VacationCampSettingFormStateProps } from "@/types/props/vacation-camp-setting-form-state-props";

export async function updateSummerCampWeekSettingAction(
  id: number,
  prevState: SummerCampWeekSettingFormStateProps,
  formData: FormData
) {
  let admin: Session<Admin> | null = await auth();
  // const rawFormData = Object.fromEntries(formData.entries())

  // console.log('rawformdata', rawFormData)
  let updateSummerCampWeekSettingSchema = Joi.object({
    'week-name': Joi.string()
      .required()
      .messages({
        "string.empty": "Week name is required.",
        "any.required": "Week name is required",
      }),
    'week-capacity': Joi.string()
      .required()
      .pattern(/^\d+$/)
      .messages({
        'string.empty': 'Capacity is required.',
        'any.required': 'Capacity is required.',
        'string.pattern.base': `Capacity must be numeric.`
      }),
    'week-start-date': Joi.string()
      .required()
      .messages({
        'string.empty': 'Week start date is required.',
        'any.required': 'Week start date is required.',
      }),
  })

  console.log('sdfsdfsd', new Date(Date.parse(formData.get('week-start-date') as string ?? '')))

  let validate = updateSummerCampWeekSettingSchema.validate({
    'week-name': formData.get('week-name') as string ?? '',
    'week-capacity': formData.get('week-capacity') as string ?? '',
    'week-start-date': formData.get('week-start-date') as string ?? '',
  }, { abortEarly: false });

  if (validate.error) {
    return validate.error?.details.reduce((prev, curr) => {
      return Object.assign({
        [curr.context?.key ?? '']: {
          value: curr.context?.value,
          errorText: curr.message,
          validationStatus: ValidationType.ERROR,
        }
      }, prev)
    }, {}) as SummerCampWeekSettingFormStateProps;
  }

  let result: Result<any> = await updateSummerCampWeekSetting({
    id: id.toString(),
    name: formData.get('week-name') as string ?? '',
    capacity: parseInt(formData.get('week-capacity') as string) ?? 1,
    notes: formData.get('week-notes') as string ?? '',
    start_date: formData.get('week-start-date') as string ?? '',
  }, admin?.accessToken!);



  if (result.resultStatus !== ResultStatus.SUCCESS) {
    return {
      success: false,
      message: result.message,
    }
  }

  return {
    success: true,
    message: 'Successfully update week setting.'
  };
}

export async function updateSummerCampSwimSettingAction(
  id: number,
  prevState: SummerCampSwimSettingFormStateProps,
  formData: FormData
) {
  let admin: Session<Admin> | null = await auth();

  let updateSummerCampSwimSettingSchema = Joi.object({
    'summer-camp-swim-swim-price': Joi.string()
      .required()
      .pattern(/^\d+$/)
      .messages({
        'string.empty': 'Price is required.',
        'any.required': 'Price is required.',
        'string.pattern.base': `Price must be numeric.`
      })
  })


  console.log('swim price', formData.get('summer-camp-swim-swim-price') ?? '',)
  let validate = updateSummerCampSwimSettingSchema.validate({
    'summer-camp-swim-swim-price': formData.get('summer-camp-swim-swim-price') ?? '',
  }, { abortEarly: false });

  if (validate.error) {
    return validate.error?.details.reduce((prev, curr) => {
      return Object.assign({
        [curr.context?.key ?? '']: {
          value: curr.context?.value,
          errorText: curr.message,
          validationStatus: ValidationType.ERROR,
        }
      }, prev)
    }, {}) as SummerCampSwimSettingFormStateProps;
  }

  let result: Result<any> = await updateSummerCampSwimSetting({
    id: id.toString(),
    price: parseInt(formData.get('summer-camp-swim-swim-price') as string) ?? 1,
    child_record_count: formData.get('summer-camp-swim-chlld-record-count') as string ?? '1',
    week_count: formData.get('summer-camp-swim-week-count') as string ?? '1',
    with_swim_trip: formData.get('summer-camp-swim-with-swim-trip') as string ?? 'false',
  }, admin?.accessToken!);

  if (result.resultStatus !== ResultStatus.SUCCESS) {
    return {
      success: false,
      message: result.message,
    }
  }

  return {
    success: true,
    message: 'Successfully update week setting.'
  };
}

export async function updateVacationCampSettingAction(
  id: number,
  prevState: VacationCampSettingFormStateProps,
  formData: FormData
) {
  let admin: Session<Admin> | null = await auth();

  const rawFormData = Object.fromEntries(formData.entries())

  console.log('dafdfd', rawFormData)

  return prevState;
}

export async function updateProgramYearCycleSettingAction(
  id: number,
  prevState: any,
  formData: FormData
) {
  let admin: Session<Admin> | null = await auth();

  let result = await updateProgramYearCycleSetting({
    id: id.toString(),
    current_year_cycle: formData.get('current-year') as string ?? '',
    next_year_cycle: formData.get('next-year') as string ?? '',
  }, admin?.accessToken!);


  if (result.resultStatus !== ResultStatus.SUCCESS) {
    return {
      message: result.message,
      success: false
    }
  }

  return {
    message: 'Successfully updated',
    success: true
  }
}