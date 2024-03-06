'use server';

import { auth } from "@/auth";
import { Admin } from "@/models/admin";
import { Session } from "next-auth";
import * as Joi from "joi";
import { ValidationType } from "@/types/enums/validation-type";
import {
  updateBeforeOrAfterSchoolSettings,
  updateProgramYearCycleSetting,
  updateSummerCampPromoSettings,
  updateSummerCampSwimSetting,
  updateSummerCampWeekSetting,
  updateVacationCampScheduleSetting
} from "@/services/program-settings-services";
import { Result } from "@/models/result";
import { ResultStatus } from "@/types/enums/result-status";
import { SummerCampWeekSettingFormStateProps } from "@/types/props/summer-camp-week-setting-form-state-props";
import { SummerCampSwimSettingFormStateProps } from "@/types/props/summer-camp-swim-setting-form-state-props";
import { VacationCampSettingFormStateProps } from "@/types/props/vacation-camp-setting-form-state-props";
import { ProgramYearCycleSettingFormStateProps } from "@/types/props/program-year-cycle-setting-form-state-props";
import { SummerCampSwimSetting } from "@/models/summer-camp-swim-setting";

export async function updateSummerCampWeekSettingAction(
  id: number,
  prevState: SummerCampWeekSettingFormStateProps,
  formData: FormData
) {
  let admin: Session<Admin> | null = await auth();

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

  let weekName = formData.get('week-name') as string ?? '';
  let weekCapacity = formData.get('week-capacity') as string ?? '';
  let weekStartDate = formData.get('week-start-date') as string ?? '';
  let weekNotes = formData.get('week-notes') as string ?? '';
  let weekEnabled = !!formData.get('week-enabled') ? true : false;

  let validate = updateSummerCampWeekSettingSchema.validate({
    'week-name': weekName,
    'week-capacity': weekCapacity,
    'week-start-date': weekStartDate,
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

  let tempFormData = new FormData();
  tempFormData.append(`summer_camp_weeks[id]`, id.toString());
  tempFormData.append(`summer_camp_weeks[name]`, weekName);
  tempFormData.append(`summer_camp_weeks[capacity]`, weekCapacity);
  tempFormData.append(`summer_camp_weeks[start_date]`, weekStartDate);
  tempFormData.append(`summer_camp_weeks[notes]`, weekNotes);
  tempFormData.append(`summer_camp_weeks[enabled]`, weekEnabled ? 'true' : 'false');

  let result: Result<any> = await updateSummerCampWeekSetting(tempFormData, admin?.accessToken!);

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
    'summer-camp-swim-price': Joi.string()
      .required()
      .pattern(/^\d+$/)
      .messages({
        'string.empty': 'Price is required.',
        'any.required': 'Price is required.',
        'string.pattern.base': `Price must be numeric.`
      })
  })

  let validate = updateSummerCampSwimSettingSchema.validate({
    'summer-camp-swim-price': formData.get('summer-camp-swim-price') ?? '',
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

  let result: Result<SummerCampSwimSetting> = await updateSummerCampSwimSetting({
    id: id.toString(),
    price: parseInt(formData.get('summer-camp-swim-price') as string) ?? 1,
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
    message: 'Successfully update summer camp swim setting.'
  };
}

export async function updateSummerCampPromoSettingsAction(
  prevState: any,
  formData: FormData
) {
  let admin: Session<Admin> | null = await auth();

  const formDataArray = [];
  let currentObj: { [key: string]: any } = {};

  for (const pair of formData.entries()) {
    const [key, value] = pair;
    if (key.includes('summer-camp-promo')) {
      if (key.includes('id')) {
        if (Object.keys(currentObj).length !== 0) {
          formDataArray.push(currentObj);
          currentObj = {};
        }
      }
      currentObj[key.replace('summer-camp-promo[][', '').replace(']', '')] = value;
    }
  }

  // Push the last object to the array
  if (Object.keys(currentObj).length !== 0) {
    formDataArray.push(currentObj);
  }

  const summerCampPromoSettingSchema = Joi.object({
    price: Joi.string()
      .required()
      .pattern(/^\d*\.?\d+$/)
      .messages({
        'string.empty': 'Price is required.',
        'any.required': 'Price is required.',
        'string.pattern.base': `Price must be in decimal form.`
      })
  })

  let validateError: { errors: Array<{ [key: string]: any }> } = { errors: [] };

  formDataArray.forEach((val: { [key: string]: any }) => {
    let validate = summerCampPromoSettingSchema.validate({
      price: val.price!
    }, { abortEarly: false });

    if (validate.error) {
      validateError.errors.push(validate.error?.details.reduce((prev, curr) => {
        return Object.assign({
          [curr.context?.key ?? '']: {
            value: curr.context?.value,
            errorText: curr.message,
            validationStatus: ValidationType.ERROR,
          },
          id: val.id
        }, prev)
      }, {}) as any);
    }
  })

  if (validateError.errors.length > 0) {
    return validateError;
  }

  const arrResult = await Promise.all(
    formDataArray.map((val: any) => {
      return updateSummerCampPromoSettings({
        id: parseInt(val?.id!) ?? 1,
        name: val?.name ?? '',
        child_record_count: val?.child_record_count ?? 1,
        week_count: val?.week_count ?? 6,
        price: val?.price ?? 1,
        with_swim_trip: "false"
      }, admin?.accessToken!)
    })
  )

  return {
    message: 'Successfull updated the summer camp week promo setting',
    success: true,
  }
}

export async function updateVacationCampSettingAction(
  id: number,
  prevState: VacationCampSettingFormStateProps,
  formData: FormData
) {
  let admin: Session<Admin> | null = await auth();
  const rawFormData = Object.fromEntries(formData.entries())

  let name = formData.get('vacation-camp-name') as string ?? '';
  let capacity = formData.get('vacation-camp-capacity') as string ?? '';
  let dates = formData.get('vacation-camp-dates') as string ?? '';

  const [monthStr, yearStr] = (formData.get('vacation-camp-month-year-date') as string ?? '').split(' ');

  let vacationCampSettingSchema = Joi.object({
    'vacation-camp-name': Joi.string()
      .required()
      .messages({
        'string.empty': 'Name is required.',
        'any.required': 'Name is required.',
      }),
    'vacation-camp-capacity': Joi.string()
      .required()
      .pattern(/^\d+$/)
      .messages({
        'string.empty': 'Capacity is required.',
        'any.required': 'Capacity is required.',
        'string.pattern.base': `Capacity must be numeric.`
      }),
    'vacation-camp-dates': Joi.string()
      .required()
      .messages({
        'string.empty': 'Dates is required.',
        'any.required': 'Dates is required.',
      }),
  });

  let validate = vacationCampSettingSchema.validate({
    'vacation-camp-name': name,
    'vacation-camp-capacity': capacity,
    'vacation-camp-dates': dates,
  }, {
    abortEarly: false,
  })

  if (validate.error) {
    return validate.error?.details.reduce((prev, curr) => {
      return Object.assign({
        [curr.context?.key ?? '']: {
          value: curr.context?.value,
          errorText: curr.message,
          validationStatus: ValidationType.ERROR,
        }
      }, prev)
    }, {}) as VacationCampSettingFormStateProps;
  }

  let formDataToSend = new FormData();

  formDataToSend.append(`vacation_camp_schedules[${id}]name`, name);
  formDataToSend.append(`vacation_camp_schedules[${id}]year`, yearStr)
  formDataToSend.append(`vacation_camp_schedules[${id}]month`, monthStr);
  formDataToSend.append(`vacation_camp_schedules[${id}]dates`, dates);

  let result = await updateVacationCampScheduleSetting(formDataToSend, admin?.accessToken!);

  if (result.resultStatus !== ResultStatus.SUCCESS) {
    return {
      message: result.message ?? result.error,
      success: false,
    }
  }

  return {
    message: 'Successfully updated a vacation schedule',
    success: true,
  }
}

export async function updateProgramYearCycleSettingAction(
  id: number,
  prevState: ProgramYearCycleSettingFormStateProps,
  formData: FormData
) {
  let admin: Session<Admin> | null = await auth();

  const programSettingSchema = Joi.object({
    'current-year': Joi.string()
      .required()
      .messages({
        'string.empty': 'Current Year Cycle is required.',
        'any.required': 'Current Year Cycle is required.',
      }),
    'next-year': Joi.string()
      .required()
      .messages({
        'string.empty': 'Next Year Cycle is required.',
        'any.required': 'Next Year Cycle is required.',
      })
  })

  let currentYear = formData.get('current-year') as string ?? '';
  let nextYear = formData.get('next-year') as string ?? ''

  let validate = programSettingSchema.validate({
    'current-year': currentYear,
    'next-year': nextYear
  }, { abortEarly: false })

  if (validate.error) {
    return validate.error?.details.reduce((prev, curr) => {
      return Object.assign({
        [curr.context?.key ?? '']: {
          value: curr.context?.value,
          errorText: curr.message,
          validationStatus: ValidationType.ERROR,
        }
      }, prev)
    }, {}) as ProgramYearCycleSettingFormStateProps;
  }

  let result = await updateProgramYearCycleSetting({
    id: id.toString(),
    current_year_cycle: `${currentYear}-${parseInt(currentYear) + 1}`,
    next_year_cycle: `${nextYear}-${parseInt(nextYear) + 1}`,
  }, admin?.accessToken!);


  if (result.resultStatus !== ResultStatus.SUCCESS) {
    return {
      message: result.message,
      success: false,

    }
  }

  return {
    message: 'Successfully updated program setting year cycle.',
    success: true,

  }
}

export async function updateBeforeOrAfterSchoolSettingAction(
  prevState: any,
  formData: FormData,
) {
  let admin: Session<Admin> | null = await auth();

  let result = await updateBeforeOrAfterSchoolSettings(formData, admin?.accessToken!);

  if (result.resultStatus !== ResultStatus.SUCCESS) {
    return {
      success: false,
      message: result.message,
    }
  }

  return {
    success: true,
    message: 'Successfully update the before or after school setting data.'
  };
}