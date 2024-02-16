'use server';

import { ValidationType } from "@/types/enums/validation-type";
import * as Joi from "joi";

export async function addLocationPlace(prevState: any, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());

  console.log('rawformdata', rawFormData);
  let errors = validateErrors(rawFormData);

  if (errors) {
    return errors;
  }

  return {};
}

export async function editLocationPlace(prevState: any, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());

  let errors = validateErrors(rawFormData);

  if (errors) {
    return errors;
  }

  return {};
}

/* helpers */
const locationSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      'string.empty': 'Location name is required.',
      'any.required': 'Location name is required.'
    }),
  'director[id]': Joi.string()
    .required()
    .messages({
      'any.required': 'Director is required.',
      'string.empty': 'Director is required',
    }),
  address: Joi.string()
    .required()
    .messages({
      'string.empty': 'Address is required.',
      'any.required': 'Address is required.'
    }),
  'location-minimum-age': Joi.string()
    .required()
    .pattern(/^[0-9]$/)
    .messages({
      'string.empty': 'Minimum age is required.',
      'any.required': 'Minimum age is required.',
      'string.pattern.base': `Minimum age must be numeric.`
    })
});

type LocationKeys = 'name' | 'address' | 'location-minimum-age' | 'director[id]';

function validateErrors(formData: { [k: string]: FormDataEntryValue; }) {
  const validate = locationSchema.validate(formData, { abortEarly: false });

  if (validate.error) {
    let errors: any = validate.error?.details.reduce((prev, curr) => {
      let key = curr.context?.key;

      const locationKeysObj: Record<LocationKeys, boolean> = {
        'name': true,
        'address': true,
        'location-minimum-age': true,
        'director[id]': true
      };

      if (key && locationKeysObj[key as LocationKeys]) {
        return Object.assign({
          [key]: {
            value: curr.context?.value,
            errorText: curr.message,
            validationStatus: ValidationType.ERROR,
          }
        }, prev);
      }
      return prev;

    }, {});

    return errors;
  }

  return validate.error;
}