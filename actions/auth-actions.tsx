'use server'

import { nextauthSignIn, nextauthSignOut } from '@/services/nextauth-services';
import { redirect } from 'next/navigation';
import * as Joi from 'joi';
import { ValidationType } from '@/types/enums/validation-type';
import { LoginFormStateProps } from '@/types/props/login-form-state-props';
import { ParentRegisterFormStateProps } from '@/types/props/parent-register-form-state-props';
import { registerCustomer, registerParent } from '@/services/parent-register-services';
import { ResultStatus } from '@/types/enums/result-status';
import { Result } from '@/models/result';
import { fieldInputValue } from '@/types/helpers/field-input-value';
import { CustomerInfoFormStateProps } from '@/types/props/customer-info-form-state-props';
import { Session } from 'next-auth';
import { auth, unstable_update } from '@/auth';

export async function authSignOut(redirectTo: string) {
  let result = await nextauthSignOut(redirectTo);

  redirect(result?.redirect);
}

export async function authSignIn(
  formData: FormData,
  redirectTo: string,
) {
  let result = await nextauthSignIn(formData, redirectTo);

  return result;
}

export async function roleLogin(
  redirectTo: string,
  prevState: LoginFormStateProps,
  formData: FormData
) {

  const loginSchema = Joi.object(emailPassSchema);

  let validate = loginSchema.validate(
    {
      email: formData.get('email'),
      password: formData.get('password')
    },
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
    }, {}) as LoginFormStateProps;
  }

  let result = await authSignIn(formData, redirectTo);

  if (result?.error) {
    return {
      error: result.error,
      success: false,
      message: result.error,
    };
  }

  redirect(result);
}

export async function registerParentAction(
  prevState: ParentRegisterFormStateProps,
  formData: FormData
) {

  let email = formData.get('email') as string ?? '';
  let password = formData.get('password') as string ?? '';

  let registerSchema = Joi.object({
    ...emailPassSchema,
    confirm_password: Joi.string()
      .valid(Joi.ref('password'))
      .required()
      .messages({
        'any.only': 'Passwords do not match',
        'string.empty': 'Password confirmation is required',
        'any.required': 'Password confirmation is required',
      }),
  });

  let registerDetails = {
    confirm_password: formData.get('confirm_password') as string ?? '',
    email,
    password,
  };

  let validate = registerSchema.validate(registerDetails, { abortEarly: false });

  if (validate.error) {
    return validate.error?.details.reduce((prev, curr) => {
      return Object.assign({
        [curr.context?.key ?? '']: {
          value: curr.context?.value,
          errorText: curr.message,
          validationStatus: ValidationType.ERROR,
        }
      }, prev)
    }, {}) as ParentRegisterFormStateProps;
  }

  let result: Result<any> = await registerParent(registerDetails);

  if (result.resultStatus !== ResultStatus.SUCCESS) {
    return {
      success: false,
      message: result?.errors?.[0] ?? result.message,
      error: result?.errors?.[0] ?? result.error ?? result.message,
    };
  }

  return {
    password: fieldInputValue(password),
    email: fieldInputValue(email),
    success: true,
    message: 'Successfully registered parent account.'
  };
}

export async function registerCustomerAction(
  prevState: CustomerInfoFormStateProps,
  formData: FormData
) {
  let parent: Session | null = await auth();

  let first_name = formData.get('first_name') as string ?? '';
  let last_name = formData.get('last_name') as string ?? '';

  let customerSchema = Joi.object({
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

  let validate = customerSchema.validate(
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
    }, {}) as CustomerInfoFormStateProps;
  }

  console.log('sdfsdfds', formData.get('how-did-you-hear-about-us'))
  let result = await registerCustomer({
    email: parent?.user.email ?? '',
    first_name,
    last_name,
    phone_number: formData.get('phone-number') as string ?? '',
    emergency_phone_number: formData.get('emergency-number') as string ?? '',
    address_line_one: formData.get('address-line-one') as string ?? '',
    address_line_two: formData.get('address-line-two') as string ?? '',
    city: formData.get('address-city') as string ?? '',
    state: formData.get('address-state') as string ?? '',
    zip_code: formData.get('address-zipcode') as string ?? '',
    how_did_you_here_about_us: formData.get('how-did-you-hear-about-us') as string ?? ''
  }, parent?.user?.accessToken!);

  if (result.resultStatus !== ResultStatus.SUCCESS) {
    return {
      message: result.message,
      success: false,
    };
  }

  let updateSession = await unstable_update({ user: { first_name, last_name } });

  return {
    message: result.message,
    success: true,
  };
}

/* helpers */
const emailPassSchema = {
  email: Joi.string()
    .required()
    .email()
    .messages({
      'string.empty': 'Email is required.',
      'string.email': 'Email is in invalid format.',
      'any.required': 'Email is required',
    }),
  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Password is required.',
      'any.required': 'Password is required',
    }),
};