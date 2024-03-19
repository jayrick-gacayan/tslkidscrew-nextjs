'use server';

import { auth, unstable_update } from '@/auth';
import { Parent } from '@/models/parent';
import { Result } from '@/models/result';
import { addOrUpdateBankDetails, getCustomerInfo, updateCustomerInfo } from '@/services/parent-info-services';
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

  let first_name = formData.get('first_name') as string ?? '';
  let last_name = formData.get('last_name') as string ?? '';

  let updateCustomerInfoSchema = Joi.object({
    first_name: Joi.string()
      .required()
      .messages({
        'string.empty': 'Firstname is required.',
        'any.required': 'Firstname is required',
      }),
    last_name: Joi.string()
      .required()
      .messages({
        'string.empty': 'Lastname is required.',
        'any.required': 'Lastname is required',
      }),
  });

  let validate = updateCustomerInfoSchema.validate(
    { first_name, last_name },
    { abortEarly: false }
  );

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
    phone_number: formData.get('phone-number') as string ?? '',
    emergency_phone_number: formData.get('emergency-number') as string ?? '',
    address_line_one: formData.get('address-line-one') as string ?? '',
    address_line_two: formData.get('address-line-two') as string ?? '',
    city: formData.get('address-city') as string ?? '',
    state: formData.get('address-state') as string ?? '',
    zip_code: formData.get('address-zipcode') as string ?? '',
  }, parent?.user?.accessToken!);

  if (result.resultStatus !== ResultStatus.SUCCESS) {
    return {
      message: result.message,
      success: false,
    };
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
  };
}

export async function getParentInfo() {
  let parent: Session | null = await auth();

  let parentData: Omit<Session, 'accessToken'> | null = parent;

  return parentData;
}

export async function getCustomerInfoAction() {
  let parent: Session | null = await auth();

  let { customer_id, accessToken } = parent?.user!;
  return await getCustomerInfo(customer_id?.toString()!, accessToken!);
}

export async function addOrUpdateBankDetailsAction(public_token: string) {
  console.log('public token', public_token)
  let parent: Session | null = await auth();
  let urlSearchParams = new URLSearchParams();
  urlSearchParams.set('public_token', public_token)

  let result: Result<Parent> = await addOrUpdateBankDetails(`?${urlSearchParams.toString()}`, parent?.user.accessToken!);

  if (result.resultStatus !== ResultStatus.SUCCESS) {
    return {
      message: result.message,
      success: false
    }
  }

  return {
    message: 'Successfully add or update bank details',
    success: true
  }

}