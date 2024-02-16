'use server'


import { nextauthSignIn, nextauthSignOut } from "@/services/nextauth-services";
import { redirect } from "next/navigation";
import * as Joi from "joi";
import { ValidationType } from "@/types/enums/validation-type";

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

export async function roleLogin(redirectTo: string, prevState: any, formData: FormData) {

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

  let validate = loginSchema.validate({
    email: formData.get('email'),
    password: formData.get('password')
  }, { abortEarly: false, });

  if (validate.error) {
    const errors: { [key: string]: { value: any, errorText: string, validationType: ValidationType } } = {};

    validate.error.details.forEach(err => {
      errors[err.context?.key ?? ''] = {
        value: err.context?.value,
        errorText: err.message,
        validationType: ValidationType.ERROR,
      };
    });

    return errors;
  }

  let result = await authSignIn(formData, redirectTo);

  if (result?.error) {
    return { error: result.error }
  }

  redirect(result);
}