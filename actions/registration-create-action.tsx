'use server';

import { auth } from '@/auth';
import { Parent } from '@/models/parent';
import { Result } from '@/models/result';
import { SummerCampPromoSetting } from '@/models/summer-camp-promo-setting';
import { SummerCampWeekSetting } from '@/models/summer-camp-week-setting';
import { createRegistrationRecord } from '@/services/create-registration-record-services';
import { getCustomerInfo } from '@/services/parent-info-services';
import {
  getProgramSettingYearCycleForRegRecord,
  getSummerCampPromosForCreateRegRecord,
  getSummerCampWeeksForRegular
} from '@/services/program-settings-services';
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
  let highestStep = programType === 'before-or-after-school' ? 5 : 4;
  let parent: Session | null = await auth();

  let customerInfo: Result<Parent> = await getCustomerInfo(
    parent?.user.customer_id?.toString()!, parent?.user?.accessToken!);

  let tempObject: { [key: string]: any } = {
    stepOne: prevState.stepOne,
    stepTwo: prevState.stepTwo,
    stepThree: prevState.stepThree,
    stepFour: prevState.stepFour,
  }

  if (prevState.stepFive !== undefined) {
    tempObject['stepFive'] = prevState.stepFive
  }

  let objectStep: { [key: string]: any } = tempObject;

  if (step === 1) {
    let tempLocationData = formData.get('location-place[id]')
    let location = tempLocationData as string ?? ''

    let locationSchema = Joi.object({
      'location-place[id]': Joi.string()
        .required()
        .messages({
          'any.required': 'Location is required.',
          'string.empty': 'Location is required',
        }),
    });

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

    return { message: undefined, ...objectStep, stepOne: true, };
  } else if (step === 2) {
    if (!!formData.get('back-button')) { return { ...objectStep, stepOne: false, }; }

    const childrenArray = [];
    let curChild: { [key: string]: any } = {};

    for (const pair of formData.entries()) {
      const [key, value] = pair;
      if (key.includes('children')) {
        if (key.includes('firstname')) {
          if (Object.keys(curChild).length !== 0) {
            childrenArray.push(curChild);
            curChild = {};
          }
        }
        curChild[key.replace('children[][', '').replace(']', '')] = value;
      }
    }

    // Push the last object to the array
    if (Object.keys(curChild).length !== 0) {
      childrenArray.push(curChild);
    }

    return { message: undefined, ...objectStep, stepTwo: true, };
  } else if (step === 3) {
    if (!!formData.get('back-button')) { return { ...objectStep, stepTwo: false, }; }


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
            };
          }
          return { ...objectStep, stepThree: true, };
        }
      default: return { ...objectStep, stepThree: true };
    }
  } else if (step === 4 && programType === 'before-or-after-school') {
    if (!!formData.get('back-button')) { return { ...objectStep, stepThree: false, }; }

    let startDate = formData.get('before-or-after-registration-start-date') as string ?? '';
    let beforeSchool = formData.getAll('before-school[]') as any[] ?? [];
    let afterSchool = formData.getAll('after-school[]') as any[] ?? [];

    let errors: { [key: string]: any } = {};

    if (startDate === '') {
      errors[`start-date`] = {
        value: startDate,
        errorText: 'Start date is required',
        validationStatus: ValidationType.ERROR
      };
    }

    if ((beforeSchool.length + afterSchool.length) < 3) {
      errors[`before-or-after-week-days`] = {
        value: { beforeSchool, afterSchool },
        errorText: "Must choose at least one week day.",
        validationStatus: ValidationType.ERROR,
      };
    }

    if (Object.keys(errors).length > 0) {
      return { ...errors, ...objectStep };
    }

    return { ...objectStep, stepFour: true };
  } else if (step === highestStep) {
    let stepKey = programType === 'before_or_after_school' ? 'stepFour' : 'stepThree';

    if (!!formData.get('back-button')) {
      return { ...objectStep, [stepKey]: false, };
    }

    let getAllCheckboxes: string[] = formData.getAll(`${programType}-tos[]`) as string[];

    let checkItems = programType === 'before-or-after-school' ? 10 : 11

    if (getAllCheckboxes.length < checkItems) {
      return {
        ...objectStep,
        'payment-tos-terms-error': {
          value: getAllCheckboxes,
          errorText: "Must check all the checkboxes.",
          validationStatus: ValidationType.ERROR,
        },
      };
    }

    if (!!formData.get('location')) {
      if (!!customerInfo.data) {
        let {
          first_name,
          last_name,
          id,
          phone_number,
          emergency_phone_number,
          address_line_one,
          address_line_two,
          city,
          state,
          zip_code,
          email,
        }: Parent = customerInfo.data;

        const childrenArray = [];
        let curObjForChild: { [key: string]: any } = {};

        for (const pair of formData.entries()) {
          const [key, value] = pair;
          if (key.includes('child-info')) {
            if (key.includes('firstname')) {
              if (Object.keys(curObjForChild).length !== 0) {
                childrenArray.push(curObjForChild);
                curObjForChild = {};
              }
            }
            curObjForChild[key.replace('child-info[][', '').replace(']', '')] = value;
          }
        }

        if (Object.keys(curObjForChild).length !== 0) {
          childrenArray.push(curObjForChild);
        }

        let regRecord: { [key: string]: any } = {
          email: email,
          location: decodeURIComponent(formData.get('location') as string ?? ''),
          customer_id: id?.toString(),
          parent_first_name: first_name,
          parent_last_name: last_name,
          phone_number,
          emergency_phone_number,
          address_line_one,
          address_line_two,
          city,
          state,
          zip_code,
          agree_to_tos: formData.get('agree_to_tos') as string === "true",
          referrer: formData.get('referrer') as string ?? '',
          child_records_attributes: childrenArray,
        }

        switch (programType) {
          case 'before-or-after-school':
            regRecord['before_and_afterschool_record_attributes'] = {
              start_date: formData.get('start_date') as string ?? '',
              before_school_monday: formData.get('before_school_monday') as string === "true",
              before_school_tuesday: formData.get('before_school_tuesday') as string === "true",
              before_school_wednesday: formData.get('before_school_wednesday') as string === "true",
              before_school_thursday: formData.get('before_school_thursday') as string === "true",
              before_school_friday: formData.get('before_school_friday') as string === "true",
              after_school_monday: formData.get('after_school_monday') as string === "true",
              after_school_tuesday: formData.get('after_school_tuesday') as string === "true",
              after_school_wednesday: formData.get('after_school_wednesday') as string === "true",
              after_school_thursday: formData.get('after_school_thursday') as string === "true",
              after_school_friday: formData.get('after_school_friday') as string === "true",
              registration_type: true,
              year_cycle: formData.get('year_cycle') as string ?? '',
              no_deposit_required: true
            }
            break;
          case 'summer-camp':
            regRecord['summer_camp_record_attributes'] = {
              "week_one": true,
              "week_two": true,
              "week_three": true,
              "week_four": true,
              "week_five": true,
              "week_six": true,
              "week_seven": true,
              "week_eight": true,
              "week_nine": true,
              "week_ten": true
            }
            break;
        }

        console.log('regRecord', regRecord);
        let result = await createRegistrationRecord(
          JSON.stringify({ registration_record: regRecord }),
          parent?.user?.accessToken!
        );

        if (result.resultStatus !== ResultStatus.SUCCESS) {
          return {
            ...objectStep,
            message: result.message,
            success: false,
          }
        }

        let stepKey = programType === 'before-or-after-school' ? 'stepFive' : 'stepFour'

        return {
          ...objectStep,
          [stepKey]: true,
          message: 'Successfully registered a record',
          success: true,
        }
      }
    }
    else {
      if (!!customerInfo.data &&
        !!customerInfo.data.card_last_four &&
        customerInfo.resultStatus === ResultStatus.SUCCESS) {

        return { ...objectStep, hasStripeCard: true };
      }
      else {
        return { ...objectStep, hasStripeCard: false };
      }
    }
  }

  return objectStep;

}

export async function getProgramSettingYearCycleForRegRecordAction(location_id: string) {
  let parent: Session | null = await auth();

  let result: Result<any> = await getProgramSettingYearCycleForRegRecord(
    location_id,
    parent?.user?.accessToken!
  );

  return result.data ?? undefined;
}

export async function getSummerCampRegWeeksForRecordAction(location_id: string) {
  let parent: Session | null = await auth();

  let result: Result<Partial<SummerCampWeekSetting>[]> = await getSummerCampWeeksForRegular(
    location_id,
    parent?.user?.accessToken!
  );

  return result.data ?? undefined;
}
// getSummerCampRegPromosForPromo

export async function getSummerCampRegPromosForPromoAction() {
  let parent: Session | null = await auth();

  let result: Result<SummerCampPromoSetting[]> = await getSummerCampPromosForCreateRegRecord(parent?.user?.accessToken!);

  return result.data ?? undefined;
}
