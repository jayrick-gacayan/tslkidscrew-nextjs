'use client';

import { useFormState } from 'react-dom';
import FillInFormButtons from './fill-in-form-buttons';
import { fillInFormAction } from '../../../../../../actions/registration-create-actions';
import ChildrenForm from './children-form';
import LocationForm from './location-form';
import PaymentFormContainer from './payment-form-container';
import RegistrationTypeSelectionBeforeOrAfterSchool from './registration-type-selection-before-or-after-school';
import { useEffect, useMemo, useRef } from 'react';
import { LocationPlace } from '@/models/location-place';
import { redirectToPath } from '@/actions/common-actions';
import { Parent } from '@/models/parent';
import { RootState, reduxStore } from '@/react-redux/redux-store';
import {
  beforeOrAfterSchoolStartDateChanged,
  beforeOrAfterWeekDaysSetError,
  fillInFormReset,
  locationChanged,
  modalStripeToggled,
  summerCampPackageRegChanged,
  summerCampPromoSet,
  summerCampRegWeeksSet,
  tosConditionChanged,
  vacationCampsSet,
  yearCycleChanged
} from '../_redux/fill-in-form-slice';
import { FillInFormState } from '../_redux/fill-in-form-state';
import { useAppSelector } from '@/hooks/redux-hooks';
import { SummerCampPromoSetting } from '@/models/summer-camp-promo-setting';
import AttendanceScheduleVacationCamp from './attendance-schedule-vacation-camp';
import RegistrationTypeSummerCamp from './registration-type-summer-camp';
import ScheduleSelectionBeforeAndAfterSchool from './schedule-selection-before-and-after-school';
import { ChildInfoType } from '@/types/input-types/child-info-type';
import { format } from 'date-fns';
import { WEEK_DAYS } from '@/types/constants/week-days';
import { ValidationType } from '@/types/enums/validation-type';
import { SweetAlertIcon } from 'sweetalert2';
import { swalCreateRegRecordMessage } from '@/types/helpers/sweet-alert-helpers';
import { SummerCampWeekSetting } from '@/models/summer-camp-week-setting';
import { ProgramYearCycleSetting } from '@/models/program-year-cycle-setting';
import { VacationCampSetting } from '@/models/vacation-camp-setting';
import numsIntoWord from '@/types/helpers/date-helpers';
import { fieldInputValue } from '@/types/helpers/field-input-value';


export default function FormActionContainer({
  program_type,
  step,
  locations,
  cardDetails,
  bankName,

  summerCampPromos,
  summerCampWeeks,
  programYearCycle,
  vacationCamps,
  summerCampWeeksForPromo
}: {
  program_type: string;
  step: string | undefined;
  locations: Partial<LocationPlace>[];
  cardDetails: Partial<Parent> | undefined;
  bankName: string;

  summerCampPromos: SummerCampPromoSetting[];
  summerCampWeeks: Partial<SummerCampWeekSetting>[];
  programYearCycle: ProgramYearCycleSetting & any | undefined;
  vacationCamps: Partial<VacationCampSetting>[]
  summerCampWeeksForPromo: Partial<SummerCampWeekSetting>[];
}) {
  const formRef = useRef<HTMLFormElement>(null);




  const fillInFormState: FillInFormState = useAppSelector((state: RootState) => {
    return state.fillInForm;
  });

  const location: Partial<LocationPlace> | undefined = useMemo(() => {
    return fillInFormState.fillInForm.location.value
  }, [fillInFormState.fillInForm.location]);

  const childrenObj = useMemo(() => {
    return fillInFormState.fillInForm.childrenArr
  }, [fillInFormState.fillInForm.childrenArr]);

  /* For Program Type before-or-after-school */
  const { startDate, beforeSchool, afterSchool } = useMemo(() => {
    return {
      startDate: fillInFormState.fillInForm.startDate.value,
      beforeSchool: fillInFormState.fillInForm.beforeOrAfterWeekDays.value.beforeSchool,
      afterSchool: fillInFormState.fillInForm.beforeOrAfterWeekDays.value.afterSchool,
    }
  }, [
    fillInFormState.fillInForm.startDate,
    fillInFormState.fillInForm.beforeOrAfterWeekDays.value.beforeSchool,
    fillInFormState.fillInForm.beforeOrAfterWeekDays.value.afterSchool,
  ]);

  const yearCycle = useMemo(() => {
    return fillInFormState.fillInForm.yearCycle.value
  }, [fillInFormState.fillInForm.yearCycle]);
  /* For Program Type before-or-after-school */

  /* For Program Type summer-camp */
  const summerCampRegOpt = useMemo(() => {
    return fillInFormState.fillInForm.summerCampPackageReg
  }, [fillInFormState.fillInForm.summerCampPackageReg]);

  const promoPackage = useMemo(() => {
    return fillInFormState.fillInForm.promoPackage;
  }, [fillInFormState.fillInForm.promoPackage])

  const weekSummerCamps = useMemo(() => {
    return fillInFormState.fillInForm.summerCampRegWeeks.value
  }, [fillInFormState.fillInForm.summerCampRegWeeks.value]);
  /* For Program Type summer-camp */

  /* For Program Type vacation-camp */
  const campsVacation = useMemo(() => {
    return fillInFormState.fillInForm.vacationCamps.value
  }, [fillInFormState.fillInForm.vacationCamps.value])
  /* For Program Type vacation-camp */

  const stepInNumber = !step ? 1 : parseInt(step);
  const highestStep = program_type === 'before-or-after-school' ? 5 : 4;

  let objectStepInit: { [key: string]: any } = {
    stepOne: false,
    stepTwo: false,
    stepThree: false,
    stepFour: false,
  }

  const [formState, formAction] = useFormState(
    fillInFormAction.bind(null, stepInNumber, program_type),
    program_type === 'before-or-after-school' ? { ...objectStepInit, stepFive: false } : objectStepInit
  );

  useEffect(() => {
    async function swalMessage(message: string, type: SweetAlertIcon) {
      let swalResult = await swalCreateRegRecordMessage(message, type);

      if (swalResult.isConfirmed) {
        if (type === 'success') {
          await redirectToPath(`/parent/forms`);
          reduxStore.dispatch(fillInFormReset());
        }
      }
    }

    if (formState?.['message'] !== undefined &&
      formState?.['success'] !== undefined) {

      swalMessage(formState['message'], formState['success'] ? 'success' : 'error');
    }
  }, [formState]);

  useEffect(() => {
    if (formState?.['location-place[id]']) {
      let { errorText, validationStatus } = formState?.['location-place[id]']
      reduxStore.dispatch(locationChanged({ value: undefined, errorText, validationStatus }))
    }
  }, [formState]);

  // for program type 'before-or-after-school'
  useEffect(() => {
    if (program_type === 'before-or-after-school') {
      if (formState?.['year-cycle']) {
        let { errorText, validationStatus } = formState['year-cycle'];
        reduxStore.dispatch(yearCycleChanged({ value: '', errorText, validationStatus }))
      }

      if (formState?.['start-date']) {
        let { errorText, validationStatus } = formState['start-date'];
        reduxStore.dispatch(beforeOrAfterSchoolStartDateChanged({ value: undefined, errorText, validationStatus }))
      }

      if (formState?.['before-or-after-week-days']) {
        let { errorText, validationStatus } = formState['before-or-after-week-days'];
        reduxStore.dispatch(beforeOrAfterWeekDaysSetError({ errorText, validationStatus }))
      }
    }

  }, [formState, program_type]);

  // for program_type === 'summer-camp'
  useEffect(() => {
    if (program_type === 'summer-camp') {
      if (formState?.['reg-type-summer-camp']) {
        let { errorText, validationStatus } = formState['reg-type-summer-camp'];
        reduxStore.dispatch(summerCampPackageRegChanged({
          value: '', errorText, validationStatus,
        }))
      }
      if (formState?.['summer-camp-reg-weeks']) {
        let { value, errorText, validationStatus } = formState['summer-camp-reg-weeks'];
        reduxStore.dispatch(summerCampRegWeeksSet({ value, errorText, validationStatus, }))
      }

      if (formState?.['summer-camp-promo']) {
        let { value, errorText, validationStatus } = formState['summer-camp-promo'];

        reduxStore.dispatch(summerCampPromoSet({ value, errorText, validationStatus, }))
      }
    }
  }, [formState, program_type]);

  useEffect(() => {
    reduxStore.dispatch(summerCampRegWeeksSet(fieldInputValue([])))
  }, [fillInFormState.fillInForm.summerCampPackageReg.value])

  useEffect(() => {
    reduxStore.dispatch(summerCampRegWeeksSet(fieldInputValue([])))
  }, [fillInFormState.fillInForm.promoPackage.value])

  // for program_type === 'vacation-camp'
  useEffect(() => {
    if (program_type === 'vacation-camp') {
      if (formState?.['vacation-camps']) {
        let { value, errorText, validationStatus } = formState['vacation-camps'];

        reduxStore.dispatch(vacationCampsSet({ value, errorText, validationStatus }));
      }
    }
  }, [formState, program_type])

  useEffect(() => {
    function pathToURL(numberToStep: number) {
      pathToRedirectURL(stepInNumber + numberToStep, location?.id ?? undefined)
    }

    function pathToStep(stepToDec: boolean, stepToInc: boolean) {
      if (!stepToDec) { pathToURL(-1); }
      else { if (stepToInc) { pathToURL(1); } }
    }

    async function pathToRedirectURL(
      numberStep: number,
      location_id?: number,
    ) {
      let urlSearchParams = new URLSearchParams();

      if (numberStep > 1) { urlSearchParams.set('step', numberStep.toString()); }
      if (location_id) { urlSearchParams.set('location_id', location_id.toString()!); }

      let strSP = urlSearchParams.toString();
      let url = `/parent/forms/${program_type}/fill-in-form${strSP === '' ? `` : `?${strSP}`}`
      await redirectToPath(url);
    }

    let { stepOne, stepTwo, stepThree, stepFour, ...rest } = formState;

    if (stepInNumber === 1) { if (stepOne) { pathToURL(1); } }
    else if (stepInNumber === 2) { pathToStep(stepOne, stepTwo); }
    else if (stepInNumber === 3) { pathToStep(stepTwo, stepThree); }
    else if (stepInNumber === 4 && program_type === 'before-or-after-school') { pathToStep(stepThree, stepFour); }
    else if (stepInNumber === highestStep) {
      let stepError = program_type === 'before-or-after-school' ? stepFour : stepThree;

      if (!stepError) {
        pathToURL(-1);
        reduxStore.dispatch(tosConditionChanged({
          value: [],
          errorText: '',
          validationStatus: ValidationType.NONE,
        }))
      }
      else {
        if (rest?.['payment-tos-terms-error']) {
          let { value, errorText, validationStatus } = rest['payment-tos-terms-error']
          reduxStore.dispatch(tosConditionChanged({ value, errorText, validationStatus, }))
        }
        else {
          if (rest?.hasStripeCard !== undefined) {
            if (!rest.hasStripeCard) {
              reduxStore.dispatch(modalStripeToggled(true));
            }
          }



        }
      }
    }
  }, [
    stepInNumber,
    formState,
    program_type,
    childrenObj,
    location,
    highestStep,
  ]);





  function StepperPanel() {
    if (stepInNumber === 1) return (<LocationForm locations={locations} />);
    else if (stepInNumber === 2) return (<ChildrenForm />);
    else if (stepInNumber === 3) {
      switch (program_type) {
        case 'before-or-after-school':
          return (<ScheduleSelectionBeforeAndAfterSchool programYearCycle={programYearCycle} />);
        case 'summer-camp':
          return (
            <RegistrationTypeSummerCamp summerCampWeeks={summerCampWeeks}
              summerCampPromos={summerCampPromos}
              summerCampWeeksForPromo={summerCampWeeksForPromo} />
          )
        case 'vacation-camp':
          return (<AttendanceScheduleVacationCamp vacationCamps={vacationCamps} />);
      }
      return null;
    }
    else if (stepInNumber === 4 && program_type === 'before-or-after-school')
      return (<RegistrationTypeSelectionBeforeOrAfterSchool />)
    else if (stepInNumber === highestStep)
      return (<PaymentFormContainer program_type={program_type} childrenArr={childrenObj} />)

    return null;
  }

  console.log('state', formState)

  return (
    <form className='space-y-6'
      id={`${program_type}-fill-in-form`}
      ref={formRef}
      action={(formData) => {
        if (summerCampRegOpt.value === 'promo' &&
          program_type === 'summer-camp' &&
          stepInNumber === 3) {
          weekSummerCamps.forEach((scrw: Partial<SummerCampWeekSetting>) => {
            formData.append('summer-camp-reg-weeks[]', scrw.id!.toString())
          })
        }

        if (stepInNumber === highestStep) {
          formData.append('location', encodeURIComponent(location?.name!))
          formData.append('agree_to_tos', encodeURIComponent(true));

          formData.append('referrer',
            encodeURIComponent(
              program_type === 'before-or-after-school' ? 'after_school' :
                program_type === 'summer-camp' ? 'groupon_summer_camp' : 'vacation_camp')
          );

          childrenObj.forEach((val: ChildInfoType) => {
            formData.append('child-info[][first_name]', encodeURIComponent(val.first_name));
            formData.append('child-info[][last_name]', encodeURIComponent(val.last_name));
            formData.append('child-info[][school_attending]', encodeURIComponent(val.school_attending));
            formData.append('child-info[][child_classification]', encodeURIComponent('pre-schooler'));
            formData.append('child-info[][dob]', encodeURIComponent(format(new Date(val.birthdate!), 'yyyy-M-d')));
          });

          if (program_type === 'before-or-after-school') {
            formData.append('year_cycle', encodeURIComponent(yearCycle))
            formData.append('start_date', encodeURIComponent(format(new Date(startDate!), 'yyyy-M-d')));
            WEEK_DAYS.forEach((val: string) => {
              formData.append(`before_school_${val.toLowerCase()}`, encodeURIComponent(beforeSchool.includes(val)))
            })
            WEEK_DAYS.forEach((val: string) => {
              formData.append(`after_school_${val.toLowerCase()}`, encodeURIComponent(afterSchool.includes(val)))
            });
          }
          else if (program_type === 'summer-camp') {
            formData.append('reg-summer-camp-option', `summer_camp_${summerCampRegOpt.value}_registration`);

            if (summerCampRegOpt.value === 'promo') {
              formData.append('promo_name', `${numsIntoWord(promoPackage.value?.week_count ?? 1)}_weeks`);
            }

            Array.from({ length: 10 })
              .map((_val, _idx) => { return _idx + 1 })
              .forEach((val: number, idx) => {
                if (weekSummerCamps.find((scws: Partial<SummerCampWeekSetting>) => {
                  return scws.name?.includes(`Week ${val}:`)
                })) {
                  formData.append('summer_camp_weeks[]', `week_${numsIntoWord(val)}`)
                }
              });
          }
          else if (program_type === 'vacation-camp') {
            campsVacation.forEach((val: Pick<VacationCampSetting, "id" | "name" | "month" | "year">) => {
              formData.append('month[][month]', val.month!);
              formData.append('month[][id]', encodeURIComponent(val.id!));
            })
          }
        }

        formAction(formData);
      }}>
      <StepperPanel />
      <FillInFormButtons program_type={program_type}
        step={step}
        cardDetails={cardDetails}
        bankName={bankName}
        hasBankDetails={formState?.hasBankDetails} />
    </form>
  )
}