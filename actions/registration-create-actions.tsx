'use server';

import { auth } from '@/auth';
import { Parent } from '@/models/parent';
import { Result } from '@/models/result';
import { SummerCampPromoSetting } from '@/models/summer-camp-promo-setting';
import { SummerCampWeekSetting } from '@/models/summer-camp-week-setting';
import { VacationCampSetting } from '@/models/vacation-camp-setting';
import { createRegistrationRecord } from '@/services/create-registration-record-services';
import { getCustomerInfo } from '@/services/parent-info-services';
import {
  getProgramSettingYearCycleForRegRecord,
  getSummerCampPromosForCreateRegRecord,
  getSummerCampWeeksForPromo,
  getSummerCampWeeksForRegular,
  getVacationCampsForCreateRegRecord
} from '@/services/program-settings-services';
import { ResultStatus } from '@/types/enums/result-status';
import { ValidationType } from '@/types/enums/validation-type';
import {
  beforeOrAfterSchoolAttribObject,
  summerCampRecordAttribObj
} from '@/types/helpers/create-reg-record-helpers';
import * as Joi from 'joi';
import { Session } from 'next-auth';

export async function fillInFormAction(
  step: number,
  programType: string,
  prevState: { [key: string]: any },
  formData: FormData
) {
  let highestStep = programType === 'before-and-after-school' ? 5 : 4;
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
    let tempLocationData = formData.get('location-place[id]') as string ?? '';

    let locationSchema = Joi.object({
      'location-place[id]': Joi.string()
        .required()
        .messages({
          'any.required': 'Location is required.',
          'string.empty': 'Location is required',
        }),
    });

    let validate = locationSchema.validate({ 'location-place[id]': tempLocationData }, { abortEarly: false });

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

    return { ...objectStep, stepOne: true, };
  } else if (step === 2) {
    if (!!formData.get('back-button')) { return { ...objectStep, stepOne: false, }; }

    const childrenArray = [];
    let curChild: { [key: string]: any } = {};

    for (const pair of formData.entries()) {
      const [key, value] = pair;
      if (key.includes('children')) {
        if (key.includes('first_name')) {
          if (Object.keys(curChild).length !== 0) {
            childrenArray.push(curChild);
            curChild = {};
          }
        }
        curChild[key.replace('children[][', '').replace(']', '')] = value;
      }
    }

    // Push the last object to the array
    if (Object.keys(curChild).length !== 0) { childrenArray.push(curChild); }

    let childInfoSchema = Joi.object({
      first_name: Joi.string()
        .required()
        .messages({
          'any.required': 'Firstname is required.',
          'string.empty': 'Firstname is required.',
        }),
      last_name: Joi.string()
        .required()
        .messages({
          'any.required': 'Lastname is required.',
          'string.empty': 'Lastname is required',
        }),
      school_attending: Joi.string()
        .required()
        .messages({
          'any.required': 'School Attending is required.',
          'string.empty': 'School Attending is required.',
        }),
    });

    let childrenErrors: any[] = [];

    if (childrenArray.length > 0) {

      childrenArray.forEach((child: { [key: string]: any }) => {
        let validate = childInfoSchema.validate({
          first_name: child['first_name'],
          last_name: child['last_name'],
          school_attending: child['school_attending']
        }, {
          abortEarly: false,
        });

        if (validate?.error) {
          childrenErrors.push(validate.error.details.reduce((prev, curr, index) => {
            return Object.assign({
              [curr.context?.key ?? '']: {
                value: curr.context?.value,
                errorText: curr.message,
                validationStatus: ValidationType.ERROR,
              }
            }, prev)
          }, {}));
        }
      });
    }

    if (childrenErrors.length > 0) {
      return {
        ...objectStep,
        'childrenErrors': childrenErrors,
      }
    }

    return { ...objectStep, stepTwo: true, };
  } else if (step === 3) {
    if (!!formData.get('back-button')) { return { ...objectStep, stepTwo: false, }; }

    switch (programType) {
      case 'before-and-after-school':
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
      case 'summer-camp': {
        let getRadioButtonData = formData.get('reg-type-summer-camp') as string ?? '';

        if (getRadioButtonData === '') {
          return {
            ...objectStep,
            'reg-type-summer-camp': {
              value: getRadioButtonData,
              errorText: 'Please select Summer Camp Registration Type',
              validatationStatus: ValidationType.ERROR
            }
          };
        }
        else {
          let summerCampWeeksData = formData.getAll('summer-camp-reg-weeks[]') as any[] ?? [];
          let summerCampPromoData = formData.get('summer-camp-promo') as string ?? '';
          let summerCampPromoWeekData = formData.get('summer-camp-promo-week') as string ?? ''

          if (getRadioButtonData === 'regular') {
            if (summerCampWeeksData.length === 0) {
              return {
                ...objectStep,
                'summer-camp-reg-weeks': {
                  value: summerCampWeeksData,
                  errorText: 'Please select at least one summer camp week',
                  validatationStatus: ValidationType.ERROR
                }
              };
            }

            return { ...objectStep, stepThree: true }
          }
          else {
            if (summerCampPromoData === '') {
              return {
                ...objectStep,
                'summer-camp-promo': {
                  value: summerCampPromoData,
                  errorText: 'Please choose a promo package',
                  validationStatus: ValidationType.ERROR,
                }
              }
            }
            else {
              let weekCount = parseInt(summerCampPromoWeekData);

              if (summerCampWeeksData.length < weekCount || summerCampPromoData.length > weekCount) {
                return {
                  ...objectStep,
                  'summer-camp-reg-weeks': {
                    value: summerCampWeeksData,
                    errorText: `Please select at least ${weekCount} summer camp week on the promo you have selected`,
                    validatationStatus: ValidationType.ERROR
                  }
                };
              }

              return { ...objectStep, stepThree: true }
            }
          }
        }


      }
      case 'vacation-camp': {
        let getVacationCamps = formData.getAll('vacation-camp[]') as any[] ?? []

        if (getVacationCamps.length === 0) {
          return {
            ...objectStep,
            'vacation-camps': {
              value: getVacationCamps,
              errorText: 'Must select at least one vacation camp',
              validationStatus: ValidationType.ERROR,
            }
          }
        }

        return { ...objectStep, stepThree: true }
      }
    }
  } else if (step === 4 && programType === 'before-and-after-school') {
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

    if (beforeSchool.length < 3 || afterSchool.length < 3) {
      errors[`before-or-after-week-days`] = {
        value: { beforeSchool, afterSchool },
        errorText: "Must choose at least 3 week days in before school and after school",
        validationStatus: ValidationType.ERROR,
      };
    }

    if (Object.keys(errors).length > 0) {
      return { ...errors, ...objectStep };
    }

    return { ...objectStep, stepFour: true };
  } else if (step === highestStep) {
    let stepKey = programType === 'before-and-after-school' ? 'stepFour' : 'stepThree';

    if (!!formData.get('back-button')) { return { ...objectStep, [stepKey]: false }; }

    let getAllCheckboxes: string[] = formData.getAll(`${programType}-tos[]`) as string[];

    let checkItems = programType === 'before-and-after-school' ? 10 : programType === 'summer-camp' ? 11 : 4

    if (getAllCheckboxes.length < checkItems) {
      return {
        ...objectStep,
        'payment-tos-terms-error': {
          value: getAllCheckboxes,
          errorText: "Must check all the checkboxes.",
          validationStatus: ValidationType.ERROR,
        },
      };
    }// checks if the user checks all the TOS checkboxes
    else {
      let stripeToken = formData.get('stripe_token') as string ?? '';
      let public_token = formData.get('public_token') as string ?? '';
      let account_id = formData.get('account_id') as string ?? '';

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
        location: decodeURIComponent(formData.get('location') as string ?? ''),
        child_records_attributes: childrenArray,
        referrer: formData.get('referrer') as string ?? '',
        agree_to_tos: formData.get('agree_to_tos') as string === "true",
      };

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

        regRecord = {
          ...regRecord,
          email: email,
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
        }

        switch (programType) {
          case 'before-and-after-school':
            regRecord['before_and_afterschool_record_attributes'] = {
              start_date: formData.get('start_date') as string ?? '',
              ...beforeOrAfterSchoolAttribObject(formData, 'before'),
              ...beforeOrAfterSchoolAttribObject(formData, 'after'),
              registration_type: true,
              year_cycle: formData.get('year_cycle') as string ?? '',
              no_deposit_required: true
            }
            break;
          case 'summer-camp':
            let summerCampOpt = formData.get('reg-summer-camp-option') as string ?? ''
            let summer_camp_weeks = formData.getAll('summer_camp_weeks[]') as any[] ?? [];

            regRecord['summer_camp_registration_option'] = summerCampOpt;

            if (summerCampOpt.includes('promo')) {

              regRecord['promo_name'] = formData.get('promo_name') as string ?? '';
            }
            regRecord['summer_camp_record_attributes'] = summerCampRecordAttribObj(summer_camp_weeks);
            break;
          case 'vacation-camp':
            let vacationCampsMonths = formData.getAll('month[][month]') as any[] ?? [];
            let vacationCampsId = formData.getAll('month[][id]') as any[] ?? [];

            if (vacationCampsMonths.length > 0) {
              let attendanceObj: { [key: string]: any } = {};

              vacationCampsMonths.forEach((value: any, idx: number) => {
                attendanceObj[`${value}`] = vacationCampsId[idx];
              })
              regRecord['attendance'] = attendanceObj;
            }
            break;
        }

      }// data inserted for registration record;

      if (!!stripeToken) {
        // console.log('regRecord', regRecord);
        let result = await createRegistrationRecord(
          JSON.stringify({
            registration_record: regRecord,
            stripeToken,
          }),
          parent?.user?.accessToken!
        );

        if (result.resultStatus !== ResultStatus.SUCCESS) {
          return {
            ...objectStep,
            message: result.message,
            success: false,
          }
        }

        let stepKey = programType === 'before-and-after-school' ? 'stepFive' : 'stepFour'

        return {
          ...objectStep,
          [stepKey]: true,
          message: 'Successfully created a record',
          success: true,
        }
      }
      else if (!!public_token && !!account_id) {
        // console.log('regRecord', regRecord);
        let result = await createRegistrationRecord(
          JSON.stringify({
            registration_record: regRecord,
            public_token,
            account_id
          }),
          parent?.user?.accessToken!
        );

        if (result.resultStatus !== ResultStatus.SUCCESS) {
          return {
            ...objectStep,
            message: result.message,
            success: false,
          }
        }

        let stepKey = programType === 'before-and-after-school' ? 'stepFive' : 'stepFour'

        return {
          ...objectStep,
          [stepKey]: true,
          message: 'Successfully created a record',
          success: true,
        }
      }
      else {
        if (!!customerInfo.data) {
          if (!!formData.get('submit-stripe-button')) {
            if (!!customerInfo.data.card_last_four) {
              // console.log('regRecord', regRecord);
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

              let stepKey = programType === 'before-and-after-school' ? 'stepFive' : 'stepFour'

              return {
                ...objectStep,
                [stepKey]: true,
                message: 'Successfully created a record',
                success: true,
              }
            } else {
              return { ...objectStep, hasStripeCard: false };
            }
          }
          else if (!!formData.get('submit-plaid-button')) {
            if (!!customerInfo.data.bank_name) {
              // console.log('regRecord', regRecord);
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

              let stepKey = programType === 'before-and-after-school' ? 'stepFive' : 'stepFour'

              return {
                ...objectStep,
                [stepKey]: true,
                message: 'Successfully created a record',
                success: true,
              }
            } else {
              return { ...objectStep, hasBankDetails: false };
            }
          }


        }
        else {
          return {
            ...objectStep,
            message: 'No data exist for customer info',
            success: false,
          };
        }
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

export async function getVacationCampsForCreateRegRecordAction(location_id: string) {
  let parent: Session | null = await auth();

  let result: Result<Partial<VacationCampSetting>[]> = await getVacationCampsForCreateRegRecord(
    location_id,
    parent?.user?.accessToken!
  );

  return result.data ?? undefined;
}

export async function getSummerCampWeeksForPromoAction() {
  let parent: Session | null = await auth();

  let result: Result<Partial<SummerCampWeekSetting>[]> = await getSummerCampWeeksForPromo(parent?.user?.accessToken!);

  return result.data ?? undefined;
}
