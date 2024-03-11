'use server'

import { auth } from "@/auth";
import {
  addLocationProgram,
  locationProgram,
  locationPrograms,
  removeLocationProgram,
  updateLocationProgram
} from "@/services/location-program-services";
import { ResultStatus } from "@/types/enums/result-status";
import { ValidationType } from "@/types/enums/validation-type";
import { LocationProgramFormStateProps } from "@/types/props/location-program-form-state-props";
import { SearchParamsProps } from "@/types/props/search-params-props";
import * as Joi from "joi";
import { Session } from "next-auth";
import { revalidatePath } from "next/cache";

export async function locationProgramsAction(id: string, searchParams: SearchParamsProps) {
  let admin: Session | null = await auth();

  return await locationPrograms(searchParams, id, admin?.user?.accessToken!);
}

export async function locationProgramAction(program_id: string) {
  let admin: Session | null = await auth();

  return await locationProgram(program_id, admin?.user?.accessToken!);
}


export async function editLocationProgramAction(
  id: number,
  location_id: number,
  prevState: LocationProgramFormStateProps,
  formData: FormData
) {
  let admin: Session | null = await auth();

  let errors = locationProgramValidateErrors(formData);

  if (errors) {
    return errors;
  }

  let result = await updateLocationProgram(
    getProgramInputs(location_id.toString(), formData),
    id,
    admin?.user?.accessToken!
  );

  if (result.resultStatus !== ResultStatus.SUCCESS) {
    return {
      message: result.message ?? result.error,
      error: result.message ?? result.error,
      success: false
    }
  }

  return {
    data: result.data,
    message: 'Successfully updated a location program',
    success: true
  }
}

export async function addLocationProgramAction(
  id: number,
  prevState: LocationProgramFormStateProps,
  formData: FormData
) {
  let admin: Session | null = await auth();

  let errors = locationProgramValidateErrors(formData);

  if (errors) {
    return errors;
  }

  let result = await addLocationProgram(
    getProgramInputs(id.toString(), formData),
    admin?.user?.accessToken!
  );

  if (result.resultStatus !== ResultStatus.SUCCESS) {
    return {
      message: result.message ?? 'Something went wrong.',
      error: result.error ?? result.message,
      success: false
    }
  }

  return {
    data: result.data,
    message: 'Successfully created a program',
    success: true
  }
}

export async function removeProgramAction(location_id: string, id: number) {
  let admin: Session | null = await auth();

  let result = await removeLocationProgram(id, admin?.user?.accessToken!);
  revalidatePath(`/admins/locations/${location_id}/programs`);
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

function getProgramInputs(id: string, formData: FormData) {
  return {
    active: !!formData.get('active') ? 'true' : 'false',
    capacity: formData.get('capacity') as string ?? '',
    director_id: formData.get('director[id]') as string ?? '',
    location_id: id.toString(),
    name: formData.get('name') as string ?? '',
    name_suffix: formData.get('name-suffix') as string ?? '',
    is_package_active: !!formData.get('promo-package') ? 'true' : 'false'
  }
}

function locationProgramValidateErrors(formData: FormData): LocationProgramFormStateProps | undefined {
  const validate = locationProgramSchema.validate(
    {
      name: formData.get('name') ?? "",
      'name-suffix': formData.get('name-suffix') ?? "",
      'director[id]': formData.get('director[id]') ?? "",
      'capacity': formData.get('capacity') ?? "",
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
