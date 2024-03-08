'use server';

import { auth } from '@/auth';
import { Parent } from '@/models/parent';
import { Result } from '@/models/result';
import { getCustomerInfo } from '@/services/parent-info-services';
import { getProgramSettingYearCycleForRegRecord } from '@/services/program-settings-services';
import { ResultStatus } from '@/types/enums/result-status';
import { ValidationType } from '@/types/enums/validation-type';
import * as Joi from 'joi';
import { Session } from 'next-auth';

export async function fillInFormAction(
  step: number,
  programType: string,
  prevState: { [key: string]: any },
  formData: FormData
) {
  let parent: Session | null = await auth();

  let customerInfo: Result<Parent> = await getCustomerInfo(
    parent?.user.customer_id?.toString()!, parent?.user?.accessToken!);

  let { stepOne, stepTwo, stepThree, stepFour, stepFive } = prevState;

  let objectStep: { [key: string]: any } = {
    stepOne,
    stepTwo,
    stepThree,
    stepFour,
    stepFive,
  };

  console.log('objectStep', objectStep)
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

      let validate = locationSchema.validate(
        { 'location-place[id]': location },
        { abortEarly: false }
      );

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
          ...objectStep
        };
      }

      return {
        message: undefined,
        ...objectStep,
        stepOne: true,
      }

    case 2:
      if (!!formData.get('back-button')) {
        return { ...objectStep, stepOne: false, }
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
        ...objectStep,
        stepTwo: true,
      }
    case 3:
      if (!!formData.get('back-button')) {
        return { ...objectStep, stepTwo: false, }
      }

      switch (programType) {
        case 'before-or-after-school':
          {
            let getRadioButtonData = formData.get('year-cycle') as string ?? ''

            if (getRadioButtonData === '') {
              return {
                ...objectStep,
                'year-cycle': {
                  value: getRadioButtonData,
                  errorText: 'Please Select the Year Cycle',
                  validatationStatus: ValidationType.ERROR
                }
              }
            }
            return {
              ...objectStep,
              stepThree: true,
            }
          }
        default: return objectStep;
      }

    case 4:
      if (!!formData.get('back-button')) {
        return { ...objectStep, stepThree: false, }
      }

      switch (programType) {
        case 'before-or-after-school':
          {
            console.log('I am here')
            let startDate = formData.get('before-or-after-registration-start-date') as string ?? '';
            let beforeSchool = formData.getAll('before-school[]') as any[] ?? [];
            let afterSchool = formData.getAll('after-school[]') as any[] ?? [];

            let errors: { [key: string]: any } = {};

            if (startDate === '') {
              errors[`start-date`] = {
                value: startDate,
                errorText: 'Start date is required',
                validationStatus: ValidationType.ERROR
              }
            }

            if ((beforeSchool.length + afterSchool.length) < 3) {
              errors[`before-or-after-week-days`] = {
                value: { beforeSchool, afterSchool },
                errorText: "Must choose at least one week day.",
                validationStatus: ValidationType.ERROR,
              }
            }

            if (Object.keys(errors).length > 0) {
              return {
                ...errors,
                ...objectStep
              }
            }

            return {
              ...objectStep,
              stepFour: true
            };
          }


        default: return objectStep;
      }

    case 5:

      if (!!formData.get('back-button') && programType === 'before-or-after-school') {
        if (!!formData.get('back-button')) {
          return { ...objectStep, stepFour: false, }
        }
      }

      let getAllCheckboxes = formData.getAll('before-after-school-tos[]');

      if (getAllCheckboxes.length < 10) {
        return {
          'payment-tos-terms-error': {
            value: getAllCheckboxes,
            errorText: "Must choose at least one week day.",
            validationStatus: ValidationType.ERROR,
          },
          ...objectStep
        }
      }
      else {


        if (!!customerInfo.data && !!customerInfo.data.card_last_four && customerInfo.resultStatus === ResultStatus.SUCCESS) {
          return {
            ...objectStep,
            hasStripeCard: true,
          }
        }
        else {
          return {
            ...objectStep,
            hasStripeCard: false,
          }
        }
      }

    default: return {
      message: undefined,
      ...objectStep
    }
  }

}

export async function getProgramSettingYearCycleForRegRecordAction(location_id: string) {
  let parent: Session | null = await auth();

  let result: Result<any> = await getProgramSettingYearCycleForRegRecord(
    location_id,
    parent?.user?.accessToken!
  );

  return result.data ?? undefined;
}