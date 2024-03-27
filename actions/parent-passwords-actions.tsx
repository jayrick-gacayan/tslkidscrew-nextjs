'use server';

import { auth } from '@/auth';
import { Session } from 'next-auth';
import * as Joi from 'joi';
import { ValidationType } from '@/types/enums/validation-type';
import { ResultStatus } from '@/types/enums/result-status';
import {
  forgotPassword,
  changePassword,
  resetPassword
} from '@/services/passwords-services';

export async function forgotPasswordEmailAction(prevState: any, formData: FormData) {
  let email = formData.get('email') as string ?? '';

  let emailSchema = Joi.object({
    email: Joi.string()
      .email()
      .messages({
        'string.empty': 'Email is required.',
        'string.email': 'Email is in invalid format.',
        'any.required': 'Email is required',
      }),
  });

  let validate = emailSchema.validate({ email }, { abortEarly: false });

  if (validate?.error) {
    return validate.error?.details.reduce((prev, curr) => {
      return Object.assign({
        [curr.context?.key ?? '']: {
          value: curr.context?.value,
          errorText: curr.message,
          validationStatus: ValidationType.ERROR,
        }
      }, prev)
    }, {});
  };

  let result = await forgotPassword(email);

  if (result.resultStatus !== ResultStatus.SUCCESS) {
    return {
      message: result.message ?? 'Something went wrong. Please try again.',
      success: false,
    };
  }

  return {
    message: result.message,
    success: true,
  };
}

export async function forgotPasswordTokenAction(reset_password_token: string, prevState: any, formData: FormData) {
  let password = formData.get('password') as string ?? '';
  let password_confirmation = formData.get('password_confirmation') as string ?? '';

  let passwordsError = passwordValidate(password, password_confirmation);

  if (passwordsError) { return passwordsError; }

  let result = await resetPassword({ password, password_confirmation, reset_password_token });

  if (result.resultStatus !== ResultStatus.SUCCESS) {
    return {
      message: result.message,
      success: false
    };
  }

  return {
    message: 'Password has been successfully reset.',
    success: true
  };
}

export async function changePasswordAction(email: string, prevState: any, formData: FormData) {
  let parent: Session | null = await auth();

  let password = formData.get('password') as string ?? '';
  let password_confirmation = formData.get('password_confirmation') as string ?? '';

  let passwordsError = passwordValidate(password, password_confirmation);
  if (passwordsError) { return passwordsError; }

  let result = await changePassword({ email, password, password_confirmation }, parent?.user.accessToken!);

  if (result.resultStatus !== ResultStatus.SUCCESS) {
    return {
      message: result.message,
      success: false
    };
  }

  return {
    message: 'Password has been successfully changed.',
    success: true
  };
}

const passwordsSchema = Joi.object({
  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Password is required.',
      'any.required': 'Password is required',
    }),
  password_confirmation: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Passwords do not match',
      'string.empty': 'Password confirmation is required',
      'any.required': 'Password confirmation is required',
    }),
});

function passwordValidate(password: string, password_confirmation: string) {
  let validate = passwordsSchema.validate({ password, password_confirmation }, { abortEarly: false });

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

  return undefined;
}

