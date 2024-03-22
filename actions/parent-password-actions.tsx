'use server';

import { auth } from '@/auth';
import { Session } from 'next-auth';
import * as Joi from 'joi';
import { ValidationType } from '@/types/enums/validation-type';
import { changePassword } from '@/services/parent-info-services';
import { ResultStatus } from '@/types/enums/result-status';

export async function changePasswordAction(prevState: any, formData: FormData) {
  let parent: Session | null = await auth();

  let password = formData.get('password') as string ?? '';
  let confirm_password = formData.get('password-confirmation') as string ?? '';

  let validate = passwordsSchema.validate({ password, confirm_password }, { abortEarly: false });

  if (validate.error) {
    return validate.error?.details.reduce((prev, curr) => {
      return Object.assign({
        [curr.context?.key ?? '']: {
          value: curr.context?.value,
          errorText: curr.message,
          validationStatus: ValidationType.ERROR,
        }
      }, prev)
    }, {}) as any;
  }

  let urlSearchParams: URLSearchParams = new URLSearchParams();
  urlSearchParams.set('password', password);
  urlSearchParams.set('password_confirmation', confirm_password);

  let strSP = urlSearchParams.toString() === '' ? '' : `?${urlSearchParams.toString()}`;

  let result = await changePassword(strSP, parent?.user.accessToken!);

  if (result.resultStatus !== ResultStatus.SUCCESS) {
    return {
      message: result.message,
      success: false
    };
  }

  return {
    message: 'Password has been successfully changed.',
    success: false
  };
}

const passwordsSchema = Joi.object({
  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Password is required.',
      'any.required': 'Password is required',
    }),
  confirm_password: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Passwords do not match',
      'string.empty': 'Password confirmation is required',
      'any.required': 'Password confirmation is required',
    }),
});

