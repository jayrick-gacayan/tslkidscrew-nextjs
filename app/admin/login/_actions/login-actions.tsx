'use server';

import * as Joi from 'joi';
import { authSignIn } from "@/actions/auth-actions";
import { ValidationType } from '@/types/enums/validation-type';

export async function adminLogin(prevState: any, formData: FormData) {

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

  formData.set('role', 'admin')

  let result: any = await authSignIn(formData);

  if (result?.error) {
    return {
      error: result.error
    }
  }



  return result;
}