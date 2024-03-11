'use server';

import { auth, unstable_update } from '@/auth';
import { updateCustomerInfo } from '@/services/parent-info-services';
import { ResultStatus } from '@/types/enums/result-status';
import { ValidationType } from '@/types/enums/validation-type';
import { CustomerInfoFormStateProps } from '@/types/props/customer-info-form-state-props';
import * as Joi from 'joi';
import { Session } from 'next-auth';

export async function updateCustomerInfoAction(
  prevState: Partial<CustomerInfoFormStateProps>,
  formData: FormData,
) {
  let parent: Session | null = await auth();

  const rawFormData = Object.fromEntries(formData.entries());

  console.log('sdfsdkf', rawFormData)

  let first_name = formData.get('first_name') as string ?? '';
  let last_name = formData.get('last_name') as string ?? '';

  let updateCustomerInfoSchema = Joi.object({
    first_name: Joi.string()
      .required()
      .messages({
        "string.empty": "Firstname is required.",
        "any.required": "Firstname is required",
      }),
    last_name: Joi.string()
      .required()
      .messages({
        "string.empty": "Lastname is required.",
        "any.required": "Lastname is required",
      }),
  });

  let validate = updateCustomerInfoSchema.validate(
    { first_name, last_name },
    { abortEarly: false }
  );

  console.log('validate.errors', validate.error)
  if (validate.error) {
    return validate.error?.details.reduce((prev, curr) => {
      return Object.assign({
        [curr.context?.key ?? '']: {
          value: curr.context?.value,
          errorText: curr.message,
          validationStatus: ValidationType.ERROR,
        }
      }, prev)
    }, {}) as Partial<CustomerInfoFormStateProps>;
  }

  let result = await updateCustomerInfo({
    first_name,
    last_name,
    phone_number: formData.get('phone_number') as string ?? '',
    emergency_phone_number: formData.get('emergency_number') as string ?? '',
    address_line_one: formData.get('address_line_one') as string ?? '',
    address_line_two: formData.get('address_line_two') as string ?? '',
    city: formData.get('address-city') as string ?? '',
    state: formData.get('address-state') as string ?? '',
    zip_code: formData.get('address-zip_code') as string ?? '',
  }, parent?.user?.accessToken!);

  if (result.resultStatus !== ResultStatus.SUCCESS) {
    return {
      message: result.message,
      success: false,
    }
  }

  let updateSession = await unstable_update({
    user: {
      first_name,
      last_name,
    }
  });

  return {
    message: 'Successfully updated your personal details.',
    success: true,
  }
}