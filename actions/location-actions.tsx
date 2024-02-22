'use server';

import { auth } from "@/auth";
import { Admin } from "@/models/admin";
import {
  createLocationPlace,
  removeLocationPlace,
  updateLocationPlace
} from "@/services/location-services";
import { ResultStatus } from "@/types/enums/result-status";
import { ValidationType } from "@/types/enums/validation-type";
import { LocationPlaceInputs } from "@/types/input-types/location-place-input-types";
import { LocationPlaceFormStateProps } from "@/types/props/location-place-from-state-props";
import * as Joi from "joi";
import { Session } from "next-auth";
import { revalidatePath } from "next/cache";

export async function addLocationPlace(
  prevState: LocationPlaceFormStateProps,
  formData: FormData
) {
  let admin: Session<Admin> | null = await auth();
  let errors = locationPlaceValidateErrors(formData);

  if (errors) { return errors; }

  let result = await createLocationPlace(locationPlaceInputs(formData), admin?.accessToken!)

  if (result.resultStatus !== ResultStatus.SUCCESS) {
    return {
      message: 'Something went wrong please try again.',
      success: false,
    }
  }

  return {
    message: 'Successfully created a location.',
    success: true,
  };
}

export async function editLocationPlace(
  id: string,
  prevState: LocationPlaceFormStateProps,
  formData: FormData
) {
  let admin: Session<Admin> | null = await auth();
  let errors = locationPlaceValidateErrors(formData);

  if (errors !== undefined) { return errors; }

  let result = await updateLocationPlace(id, locationPlaceInputs(formData), admin?.accessToken!)

  if (result.resultStatus !== ResultStatus.SUCCESS) {
    return {
      message: 'Something went wrong please try again.',
      success: false,
    }
  }

  return {
    message: 'Successfully updated a location.',
    success: true,
  };
}

export async function destroyLocationPlace(id: string) {
  let admin: Session<Admin> | null = await auth();

  let result = await removeLocationPlace(id, admin?.accessToken!);

  console.log('result location', result)
  revalidatePath('/admin/locations')
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
    .pattern(/^\d+$/)
    .messages({
      'string.empty': 'Minimum age is required.',
      'any.required': 'Minimum age is required.',
      'string.pattern.base': `Minimum age must be numeric.`
    })
});

function locationPlaceValidateErrors(formData: FormData): LocationPlaceFormStateProps | undefined {
  const validate = locationSchema.validate(
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
    }, {}) as LocationPlaceFormStateProps;
  }

  return validate.error;
}

function locationPlaceInputs(formData: FormData): LocationPlaceInputs {
  return {
    name: formData.get('name') as string ?? "",
    address: formData.get('address') as string ?? "",
    director_id: parseInt(formData.get('director[id]') as string ?? ''),
    minimum_age: parseInt(formData.get('location-minimum-age') as string ?? '')
  }
}