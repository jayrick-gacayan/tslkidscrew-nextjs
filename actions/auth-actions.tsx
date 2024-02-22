'use server'

import { nextauthSignIn, nextauthSignOut } from "@/services/nextauth-services";
import { redirect } from "next/navigation";
import * as Joi from "joi";
import { ValidationType } from "@/types/enums/validation-type";
import { LoginFormStateProps } from "@/types/props/login-form-state-props";
import { ParentRegisterFormStateProps } from "@/types/props/parent-register-form-state-props";
import { registerParent } from "@/services/parent-authentication-services";
import { ResultStatus } from "@/types/enums/result-status";
import { Result } from "@/models/result";

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

  const loginSchema = Joi.object({
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
      })
  });

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
    success: true,
    message: 'Successfully register parent account.'
  };
}