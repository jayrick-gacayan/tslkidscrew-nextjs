'use server';

import { auth } from '@/auth';
import { LocationPlace } from '@/models/location-place';
import { Result } from '@/models/result';
import {
  createLocationPlace,
  getAllLocationsForCreateRegRecord,
  locationPlace,
  locationPlaces,
  removeLocationPlace,
  updateLocationPlace
} from '@/services/location-services';
import { ResultStatus } from '@/types/enums/result-status';
import { ValidationType } from '@/types/enums/validation-type';
import { LocationPlaceFormStateProps } from '@/types/props/location-place-from-state-props';
import { SearchParamsProps } from '@/types/props/search-params-props';
import { capitalCase } from 'change-case';
import * as Joi from 'joi';
import { Session } from 'next-auth';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function locationPlacesAction(searchParams: SearchParamsProps) {
  let admin: Session | null = await auth();

  return await locationPlaces(searchParams, admin?.user?.accessToken)
}

export async function locationPlaceAction(id: string) {
  let admin: Session | null = await auth();

  return await locationPlace(id, admin?.user?.accessToken)
}

export async function addLocationPlace(
  prevState: LocationPlaceFormStateProps,
  formData: FormData
) {
  let admin: Session | null = await auth();

  let name = formData.get('name') as string ?? '';
  let address = formData.get('address') as string ?? '';
  let director_id = formData.get('director[id]') as string ?? '';
  let minimum_age = formData.get('location-minimum-age') as string ?? '';

  let errors = locationPlaceValidateErrors({
    name,
    address,
    'director[id]': director_id,
    'location-minimum-age': minimum_age
  });

  if (errors) { return errors; }

  let result = await createLocationPlace({
    name,
    address,
    director_id: parseInt(director_id),
    minimum_age: parseInt(minimum_age)
  }, admin?.user?.accessToken!);

  if (result.resultStatus !== ResultStatus.SUCCESS) {
    return {
      message: 'Something went wrong please try again.',
      success: false,
    };
  }

  return {
    data: result.data ?? undefined,
    message: 'Successfully created a location.',
    success: true,
  };
}

export async function editLocationPlace(
  id: string,
  prevState: LocationPlaceFormStateProps,
  formData: FormData
) {
  let admin: Session | null = await auth();

  let name = formData.get('name') as string ?? '';
  let address = formData.get('address') as string ?? '';
  let director_id = formData.get('director[id]') as string ?? '';
  let minimum_age = formData.get('location-minimum-age') as string ?? '';

  let errors = locationPlaceValidateErrors({
    name,
    address,
    'director[id]': director_id,
    'location-minimum-age': minimum_age
  });

  if (errors !== undefined) { return errors; }

  let result = await updateLocationPlace(id,
    {
      name,
      address,
      director_id: parseInt(director_id),
      minimum_age: parseInt(minimum_age)
    },
    admin?.user?.accessToken!
  );

  if (result.resultStatus !== ResultStatus.SUCCESS) {
    return {
      message: 'Something went wrong please try again.',
      success: false,
    };
  }

  return {
    message: 'Successfully updated a location.',
    success: true,
  };
}

export async function removeLocationPlaceAction(id: string) {
  let admin: Session | null = await auth();

  let result = await removeLocationPlace(id, admin?.user?.accessToken!);

  revalidateTag('location-places');
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

function locationPlaceValidateErrors(validateData: {
  name: string;
  address: string;
  'director[id]': string;
  'location-minimum-age': string;
}): LocationPlaceFormStateProps | undefined {
  const validate = locationSchema.validate(validateData, { abortEarly: false, });

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

export async function getAllLocationOnProgramTypeAction(program_type: string) {
  let parent: Session | null = await auth();

  let result: Result<LocationPlace[]> = await getAllLocationsForCreateRegRecord(
    program_type === 'before-and-after-school' ? 'After School' : capitalCase(program_type)
    , parent?.user?.accessToken!);

  return result.data ?? []
}