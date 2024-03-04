'use server'

import { nextauthSignIn, nextauthSignOut } from "@/services/nextauth-services";
import { redirect } from "next/navigation";
import * as Joi from "joi";
import { ValidationType } from "@/types/enums/validation-type";
import { LoginFormStateProps } from "@/types/props/login-form-state-props";
import { ParentRegisterFormStateProps } from "@/types/props/parent-register-form-state-props";
import { registerCustomer, registerParent } from "@/services/parent-register-services";
import { ResultStatus } from "@/types/enums/result-status";
import { Result } from "@/models/result";
import { fieldInputValue } from "@/types/helpers/field-input-value";
import { CustomerInfoFormStateProps } from "@/types/props/customer-info-form-state-props";
import { Session } from "next-auth";
import { Parent } from "@/models/parent";
import { auth, unstable_update } from "@/auth";

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
    }
  }

  redirect(result);
}

export async function registerParentAction(
  prevState: ParentRegisterFormStateProps,
  formData: FormData
) {
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
  })


  let registerDetails = {
    email: formData.get('email') as string ?? '',
    password: formData.get('password') as string ?? '',
    confirm_password: formData.get('confirm_password') as string ?? '',
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
      message: result.message ?? result.error,
      error: result.message ?? result.error,
    }
  }

  return {
    password: fieldInputValue(formData.get('password') as string ?? ''),
    email: fieldInputValue(formData.get('email') as string ?? ''),
    success: true,
    message: 'Successfully registered parent account.'
  };
}

export async function registerCustomerAction(
  email: string,
  prevState: CustomerInfoFormStateProps,
  formData: FormData
) {
  let parent: Session<Parent> | null = await auth();

  const rawFormData = Object.fromEntries(formData.entries())
  console.log('rawFormData', rawFormData)
  let customerSchema = Joi.object({
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
  })

  let validate = customerSchema.validate(
    {
      first_name: formData.get('first_name') as string ?? '',
      last_name: formData.get('last_name') as string ?? '',
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
    }, {}) as CustomerInfoFormStateProps;
  }

  let result = await registerCustomer({
    email: email,
    first_name: formData.get('first_name') as string ?? '',
    last_name: formData.get('last_name') as string ?? '',
    phone_number: formData.get('phone_number') as string ?? '',
    emergency_phone_number: formData.get('emergency_number') as string ?? '',
    address_line_one: formData.get('address_line_one') as string ?? '',
    address_line_two: formData.get('address_line_two') as string ?? '',
    city: formData.get('address-city') as string ?? '',
    state: formData.get('address-state') as string ?? '',
    zip_code: formData.get('address-zip_code') as string ?? '',
    how_did_you_here_about_us: formData.get('how_did_you_hear_about_us') as string ?? ''
  }, parent?.accessToken!);

  if (result.resultStatus !== ResultStatus.SUCCESS) {
    return {
      message: result.message,
      success: false,
    }
  }

  let updateSession = await unstable_update({
    customer_id: result.data?.customer_id!,
    first_name: formData.get('first_name') as string ?? '',
    last_name: formData.get('last_name') as string ?? '',
  });

  console.log('update session', updateSession);

  return {
    message: result.message,
    success: true,
  }
}

/* helpers */
const emailPassSchema = {
  email: Joi.string()
    .required()
    .email()
    .messages({
      "string.empty": "Email is required.",
      "string.email": "Email is in invalid format.",
      "any.required": "Email is required",
    }),
  password: Joi.string()
    .required()
    .messages({
      "string.empty": "Password is required.",
      "any.required": "Password is required",
    }),
}