'use server';

import { ValidationType } from '@/types/enums/validation-type';
import * as Joi from 'joi';

export async function fillInFormAction(step: number, programType: string, prevState: any, formData: FormData) {

  switch (step) {
    case 1:

      let tempLocationData = formData.get('location-place[id]')
      let location = tempLocationData as string ?? ''

      let locationSchema = Joi.object({
        'location-place[id]': Joi.string()
          .required()
          .messages({
            'any.required': 'Location is required.',
            'string.empty': 'Location is required',
          }),
      })

      let validate = locationSchema.validate({ 'location-place[id]': location }, { abortEarly: false });

      if (validate.error) {
        return validate.error?.details.reduce((prev, curr) => {
          return Object.assign({
            [curr.context?.key ?? '']: {
              value: curr.context?.value,
              errorText: curr.message,
              validationStatus: ValidationType.ERROR,
            }
          }, prev)
        }, {}) as any;
      }

      return {
        message: undefined,
        success: true,
      }

    case 2:
      // const rawFormData = Object.entries(formData.entries())
      // console.log('dsfsdfsd', rawFormData);

      // for (const pair of formData.entries()) {
      //   console.log(pair[0], pair[1]);
      // }

      return {
        message: undefined,
        success: true,
      }

    default: return {
      message: undefined,
      success: undefined
    }
  }

}