'use server';

import { ValidationType } from '@/types/enums/validation-type';
import * as Joi from 'joi';

export async function fillInFormAction(step: number, programType: string, prevState: any, formData: FormData) {
  let { stepOne, stepTwo, stepThree, stepFour, stepFive } = prevState;

  const rawFormData = Object.fromEntries(formData.entries());

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
        return {
          ...validate.error?.details.reduce((prev, curr) => {
            return Object.assign({
              [curr.context?.key ?? '']: {
                value: curr.context?.value,
                errorText: curr.message,
                validationStatus: ValidationType.ERROR,
              }
            }, prev)
          }, {}) as any,
          stepOne,
          stepTwo,
          stepThree,
          stepFour,
          stepFive,
        };
      }

      return {
        message: undefined,
        stepOne: true,
        stepTwo,
        stepThree,
        stepFour,
        stepFive
      }

    case 2:

      if (!!formData.get('back-button')) {
        return {
          stepOne: false,
          stepTwo,
          stepThree,
          stepFour,
          stepFive
        }
      }

      const formDataArray = [];
      let currentObj: { [key: string]: any } = {};

      for (const pair of formData.entries()) {
        const [key, value] = pair;
        if (key.includes('children')) {
          if (key.includes('firstname')) {
            if (Object.keys(currentObj).length !== 0) {
              formDataArray.push(currentObj);
              currentObj = {};
            }
          }
          currentObj[key.replace('children[][', '').replace(']', '')] = value;
        }
      }

      // Push the last object to the array
      if (Object.keys(currentObj).length !== 0) {
        formDataArray.push(currentObj);
      }

      console.log('data', formDataArray)

      return {
        message: undefined,
        stepOne,
        stepTwo,
        stepThree,
        stepFour,
        stepFive
      }

    default: return {
      message: undefined,
      stepOne,
      stepTwo,
      stepThree,
      stepFour,
      stepFive,
    }
  }

}