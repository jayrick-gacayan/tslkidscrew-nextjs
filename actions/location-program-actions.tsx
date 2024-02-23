'use server'

import { auth } from "@/auth";
import { Admin } from "@/models/admin";
import { addLocationProgram } from "@/services/location-program-services";
import { ResultStatus } from "@/types/enums/result-status";
import { ValidationType } from "@/types/enums/validation-type";
import { LocationProgramFormStateProps } from "@/types/props/location-program-form-state-props";
import * as Joi from "joi";
import { Session } from "next-auth";

export async function editLocationProgramAction(
  id: number,
  location_id: number,
  prevState: LocationProgramFormStateProps,
  formData: FormData
) {
  let admin: Session<Admin> | null = await auth();

  let errors = locationProgramValidateErrors(formData);

  if (errors) {
    return errors;
  }

  return prevState
}

export async function addLocationProgramAction(
  id: number,
  prevState: LocationProgramFormStateProps,
  formData: FormData
) {
  let admin: Session<Admin> | null = await auth();

  let errors = locationProgramValidateErrors(formData);

  if (errors) {
    return errors;
  }

  let result = await addLocationProgram({
    active: !!formData.get('active') ? 'true' : 'false',
    capacity: formData.get('capacity') as string ?? '',
    director_id: formData.get('director[id]') as string ?? '',
    location_id: id.toString(),
    name: formData.get('name') as string ?? '',
    name_suffix: formData.get('name-suffix') as string ?? '',
    is_package_active: !!formData.get('promo-package') ? 'true' : 'false'
  }, admin?.accessToken!);

  if (result.resultStatus !== ResultStatus.SUCCESS) {
    return {
      error: result.error ?? result.message,
      success: false
    }
  }

  return {
    message: 'Successfully created a program',
    success: false
  }
}

/* helpers */
const locationProgramSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      'string.empty': 'Program is required.',
      'any.required': 'Program is required.'
    }),
  'name-suffix': Joi.string()
    .required()
    .messages({
      'string.empty': 'Program is required.',
      'any.required': 'Program is required.'
    }),
  'director[id]': Joi.string()
    .required()
    .messages({
      'any.required': 'Director is required.',
      'string.empty': 'Director is required',
    }),
  capacity: Joi.string()
    .required()
    .pattern(/^\d+$/)
    .messages({
      'string.empty': 'Capacity is required.',
      'any.required': 'Capacity is required.',
      'string.pattern.base': `Capacity must be numeric.`
    }),
})

function locationProgramValidateErrors(formData: FormData): LocationProgramFormStateProps | undefined {
  const validate = locationProgramSchema.validate(
    {
      name: formData.get('name') ?? "",
      address: formData.get('address') ?? "",
      'director[id]': formData.get('director[id]') ?? "",
      'location-minimum-age': formData.get('location-minimum-age') ?? "",
    },
    {
      abortEarly: false,
    }
  );

  if (validate?.error) {
    return validate.error?.details.reduce((prev, curr) => {
      return Object.assign({
        [curr.context?.key ?? '']: {
          value: curr.context?.value,
          errorText: curr.message,
          validationStatus: ValidationType.ERROR,
        }
      }, prev)
    }, {}) as LocationProgramFormStateProps;
  }

  return validate.error;
}
