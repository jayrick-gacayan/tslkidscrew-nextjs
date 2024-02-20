'use server';

import { auth } from "@/auth";
import { Admin } from "@/models/admin";
import { SummerCampWeekSettingFormStateProps } from "@/types/props/summer-camp-week-setting-form-state-props";
import { Session } from "next-auth";
import * as Joi from "joi";
import { ValidationType } from "@/types/enums/validation-type";
import { updateSummerCampSwimSetting, updateSummerCampWeekSetting } from "@/services/program-settings-services";
import { Result } from "@/models/result";
import { ResultStatus } from "@/types/enums/result-status";
import { SummerCampSwimSettingFormStateProps } from "@/types/props/summer-camp-swim-setting-form-state-props";

export async function updateSummerCampWeekSettingAction(
  id: number,
  prevState: SummerCampWeekSettingFormStateProps,
  formData: FormData
) {
  let admin: Session<Admin> | null = await auth();

  let updateSummerCampWeekSettingSchema = Joi.object({
    ['week-name']: Joi.string()
      .required()
      .messages({
        "string.empty": "Week name is required.",
        "any.required": "Week name is required",
      }),
    ['week-capacity']: Joi.string()
      .required()
      .pattern(/^\d+$/)
      .messages({
        'string.empty': 'Capacity is required.',
        'any.required': 'Capacity is required.',
        'string.pattern.base': `Capacity must be numeric.`
      })
  })

  let validate = updateSummerCampWeekSettingSchema.validate({
    ['week-name']: formData.get('week-name') ?? '',
    ['week-capacity']: formData.get('week-capacity') ?? ''
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
    id: id,
    name: formData.get('week-name') as string ?? '',
    capacity: parseInt(formData.get('week') as string) ?? 1,
    notes: formData.get('week-notes') as string ?? '',
    start_date: formData.get('week-start-date') as string ?? '',
    enabled: !!formData.get('week-enabled')
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
    ['swim-price']: Joi.string()
      .required()
      .pattern(/^\d+$/)
      .messages({
        'string.empty': 'Price is required.',
        'any.required': 'Price is required.',
        'string.pattern.base': `Price must be numeric.`
      })
  })

  let validate = updateSummerCampSwimSettingSchema.validate({
    ['swim-price']: formData.get('swim-price') ?? '',
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

  console.log('validate', validate.error)

  let result: Result<any> = await updateSummerCampSwimSetting({
    id: id,
    price: formData.get('swim-price') as string ?? '',
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