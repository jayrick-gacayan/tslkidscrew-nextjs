'use client';

import { useFormState } from 'react-dom';
import FillInFormButtons from './fill-in-form-buttons';
import { fillInFormAction } from '../../../../../../actions/registration-create-action';
import ChildrenForm from './children-form';
import LocationForm from './location-form';
import PaymentFormContainer from './payment-form-container';
import RegistrationTypeSelectionBeforeOrAfterSchool from './registration-type-selection-before-or-after-school';
import { FormEvent, useEffect, useMemo, useRef } from 'react';
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
  tosConditionChanged,
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
import { toast, ToastContentProps } from 'react-toastify';
import { SweetAlertIcon } from 'sweetalert2';
import { swalCreateRegRecordMessage } from '@/types/helpers/sweet-alert-helpers';

export default function FormActionContainer({
  program_type,
  step,
  locations,
  cardDetails,
  summerCampPromos,
}: {
  program_type: string;
  step: string | undefined;
  locations: Partial<LocationPlace>[];
  cardDetails: Partial<Parent> | undefined;
  summerCampPromos: SummerCampPromoSetting[];
}) {
  const formRef = useRef<HTMLFormElement>(null)
  const fillInFormState: FillInFormState = useAppSelector((state: RootState) => {
    return state.fillInForm;
  });

  const location: Partial<LocationPlace> | undefined = useMemo(() => {
    return fillInFormState.fillInForm.location.value
  }, [fillInFormState.fillInForm.location]);

  const children = useMemo(() => {
    return fillInFormState.fillInForm.children
  }, [fillInFormState.fillInForm.children]);

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
  }, [fillInFormState.fillInForm.yearCycle])

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
  }, [
    formState?.['message'],
    formState?.['success'],
    program_type
  ]);

  useEffect(() => {
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

    let { stepOne, stepTwo, stepThree, stepFour, stepFive, ...rest } = formState;

    function pathToURL(numberToStep: number) {
      pathToRedirectURL(stepInNumber + numberToStep, location?.id ?? undefined)
    }

    if (stepInNumber === 1) {
      if (stepOne) { pathToURL(1); }
      else {
        if (rest?.['location-place[id]']) {
          let { errorText, validationStatus } = rest?.['location-place[id]']
          reduxStore.dispatch(locationChanged({ value: undefined, errorText, validationStatus }))
        }
      }
    }
    else if (stepInNumber === 2) {
      if (!stepOne) { pathToURL(-1); }
      else {
        if (stepTwo) { pathToURL(1); }
      }
    }
    else if (stepInNumber === 3) {
      if (!stepTwo) { pathToURL(-1); }
      else {
        if (stepThree) { pathToURL(1); }
        else {
          switch (program_type) {
            case 'before-or-after-school':
              if (rest?.['year-cycle']) {
                let { errorText, validationStatus } = rest?.['year-cycle'];
                reduxStore.dispatch(yearCycleChanged({ value: '', errorText, validationStatus }))
              }
              break;
          }
        }
      }
    }
    else if (stepInNumber === 4 && program_type === 'before-or-after-school') {
      if (!stepThree) { pathToURL(-1); }
      else {
        if (!stepFour) {
          if (rest?.['start-date']) {
            let { errorText, validationStatus } = rest?.['start-date'];
            reduxStore.dispatch(beforeOrAfterSchoolStartDateChanged({ value: undefined, errorText, validationStatus }))
          }

          if (rest?.['before-or-after-week-days']) {
            let { errorText, validationStatus } = rest?.['before-or-after-week-days'];
            reduxStore.dispatch(beforeOrAfterWeekDaysSetError({ errorText, validationStatus }))
          }
        }
        else { pathToURL(1); }
      }
    }
    else if (stepInNumber === highestStep) {
      let stepError = program_type === 'before_or_after_school' ? stepFour : stepThree;

      if (!stepError) {
        pathToURL(-1);
        reduxStore.dispatch(tosConditionChanged({
          value: [],
          errorText: '',
          validationStatus: ValidationType.NONE,
        }))
      }
      else {
        if (formRef.current) {
          let formData = new FormData(formRef.current);

          formData.append('location', encodeURIComponent(location?.name!))
          formData.append('agree_to_tos', encodeURIComponent(true));

          formData.append('referrer',
            encodeURIComponent(program_type === 'before-or-after-school' ? 'after_school' : 'groupon_summer_camp')
          );

          children.forEach((val: ChildInfoType) => {
            formData.append('child-info[][first_name]', encodeURIComponent(val.first_name));
            formData.append('child-info[][last_name]', encodeURIComponent(val.last_name));
            formData.append('child-info[][school_attending]', encodeURIComponent(val.school_attending));
            formData.append('child-info[][child_classification]', encodeURIComponent('pre-schooler'));
            formData.append('child-info[][dob]', encodeURIComponent(format(new Date(val.birthdate!), 'yyyy-M-d')));
          });

          if (rest?.['payment-tos-terms-error']) {

            let { value, errorText, validationStatus } = rest['payment-tos-terms-error']
            reduxStore.dispatch(tosConditionChanged({ value, errorText, validationStatus, }))
          }
          else {
            if (rest?.hasStripeCard !== undefined) {
              if (!rest.hasStripeCard) {
                reduxStore.dispatch(modalStripeToggled(true));
              }
              else {
                if (program_type === 'before_or_after_school') {
                  formData.append('year_cycle', encodeURIComponent(yearCycle))
                  formData.append('start_date', encodeURIComponent(format(new Date(startDate!), 'yyyy-M-d')));
                  WEEK_DAYS.forEach((val: string) => {
                    formData.append(`before_school_${val.toLowerCase()}`, encodeURIComponent(beforeSchool.includes(val)))
                  })
                  WEEK_DAYS.forEach((val: string) => {
                    formData.append(`after_school_${val.toLowerCase()}`, encodeURIComponent(afterSchool.includes(val)))
                  });

                }
                formAction(formData);

              }
            }
          }
        }
      }
    }

  }, [
    stepInNumber,
    formState,
    program_type,
    cardDetails,
    children,
    location,
    highestStep,

    //for program type before-or-after-school
    yearCycle,
    beforeSchool,
    afterSchool,
    startDate,
  ]);



  function StepperPanel() {
    if (stepInNumber === 1) return (<LocationForm locations={locations} />)
    else if (stepInNumber === 2) return (<ChildrenForm />);
    else if (stepInNumber === 3) {
      switch (program_type) {
        case 'before-or-after-school': return (<ScheduleSelectionBeforeAndAfterSchool />);
        case 'summer-camp':
          return (<RegistrationTypeSummerCamp summerCampPromos={summerCampPromos} />)
        case 'vacation-camp': return <AttendanceScheduleVacationCamp />;
      }
      return null;
    }
    else if (stepInNumber === 4 && program_type === 'before-or-after-school')
      return (<RegistrationTypeSelectionBeforeOrAfterSchool />)
    else if (stepInNumber === highestStep)
      return (<PaymentFormContainer program_type={program_type} />)

    return null;
  }

  return (
    <form className='space-y-6'
      ref={formRef}
      action={formAction}>
      <StepperPanel />
      <FillInFormButtons program_type={program_type}
        step={step}
        formAction={formAction}
        cardDetails={cardDetails} />
    </form>
  )
}