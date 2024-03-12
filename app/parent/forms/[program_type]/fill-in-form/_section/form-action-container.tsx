'use client';

import { useFormState } from "react-dom";
import FillInFormButtons from "./fill-in-form-buttons";
import { fillInFormAction } from "../../../../../../actions/registration-create-action";
import ChildrenForm from "./children-form";
import LocationForm from "./location-form";
import PaymentFormContainer from "./payment-form-container";
import RegistrationTypeSelectionBeforeOrAfterSchool from "./registration-type-selection-before-or-after-school";
import { FormEvent, useEffect, useMemo, useRef } from "react";
import { LocationPlace } from "@/models/location-place";
import { redirectToPath } from "@/actions/common-actions";
import { Parent } from "@/models/parent";
import { RootState, reduxStore } from "@/react-redux/redux-store";
import {
  beforeOrAfterSchoolStartDateChanged,
  beforeOrAfterWeekDaysSetError,
  locationChanged,
  modalStripeToggled,
  tosConditionChanged,
  yearCycleChanged
} from "../_redux/fill-in-form-slice";
import { FillInFormState } from "../_redux/fill-in-form-state";
import { useAppSelector } from "@/hooks/redux-hooks";
import { SummerCampPromoSetting } from "@/models/summer-camp-promo-setting";
import AttendanceScheduleVacationCamp from "./attendance-schedule-vacation-camp";
import RegistrationTypeSummerCamp from "./registration-type-summer-camp";
import ScheduleSelectionBeforeAndAfterSchool from "./schedule-selection-before-and-after-school";
import { ChildInfoType } from "@/types/input-types/child-info-type";
import { format } from 'date-fns';
import { WEEK_DAYS } from "@/types/constants/week-days";

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
    async function pathToRedirectURL(
      numberStep: number,
      location_id?: number,
    ) {
      let urlSearchParams = new URLSearchParams();

      if (numberStep > 1) { urlSearchParams.set(encodeURIComponent('step'), encodeURIComponent(numberStep)) }
      if (location_id) { urlSearchParams.set(encodeURIComponent('location_id'), encodeURIComponent(location_id)) }

      let strSP = urlSearchParams.toString();
      let url = `/parent/forms/${program_type}/fill-in-form${strSP === '' ? `` : `?${strSP}`}`
      await redirectToPath(url);
    }

    let { stepOne, stepTwo, stepThree, stepFour, stepFive, ...rest } = formState;

    function pathToURL(numberToStep: number) {
      pathToRedirectURL(stepInNumber + numberToStep, location?.id ?? undefined)
    }

    switch (stepInNumber) {
      case 1:
        if (stepOne) { pathToURL(1); }
        else {
          if (formState?.['location-place[id]']) {
            let { errorText, validationStatus } = formState?.['location-place[id]']
            reduxStore.dispatch(locationChanged({ value: undefined, errorText, validationStatus }))
          }
        }
        break;
      case 2:
        if (!stepOne) { pathToURL(-1); }
        else {
          if (stepTwo) { pathToURL(1); }
        }
        break;
      case 3:
        if (!stepTwo) { pathToURL(-1); }
        else {
          if (stepThree) { pathToURL(1); }
          else {
            switch (program_type) {
              case 'before-or-after-school':
                if (formState?.['year-cycle']) {
                  let { errorText, validationStatus } = formState?.['year-cycle'];
                  reduxStore.dispatch(yearCycleChanged({ value: '', errorText, validationStatus }))
                }
                break;
            }
          }
        }
        break;
      case 4:
        if (!stepThree) { pathToURL(-1); }
        else {
          switch (program_type) {
            case 'before-or-after-school':
              if (!stepFour) {
                if (formState?.['start-date']) {
                  let { errorText, validationStatus } = formState?.['start-date'];
                  reduxStore.dispatch(beforeOrAfterSchoolStartDateChanged({ value: undefined, errorText, validationStatus }))
                }

                if (formState?.['before-or-after-week-days']) {
                  let { errorText, validationStatus } = formState?.['before-or-after-week-days'];
                  reduxStore.dispatch(beforeOrAfterWeekDaysSetError({ errorText, validationStatus }))
                }
              }
              else { pathToURL(1); }
              break;
          }
        }
        break;
      case 5:
        if (program_type === 'before-or-after-school') {
          if (!stepFour) { pathToURL(-1); }
          else {
            if (formState?.['payment-tos-terms-error']) {
              let { value, errorText, validationStatus } = formState?.['payment-tos-terms-error']
              reduxStore.dispatch(tosConditionChanged({
                value,
                errorText,
                validationStatus,
              }))
            }
            else {
              if (formState?.hasStripeCard !== undefined) {
                if (!formState.hasStripeCard) {
                  reduxStore.dispatch(modalStripeToggled(true));
                }
                else {
                  if (formRef.current) {
                    let formData = new FormData(formRef.current);

                    formData.append('location', encodeURIComponent(location?.name!))
                    formData.append('agree_to_tos', encodeURIComponent(true));
                    formData.append('referrer', encodeURIComponent('after_school'));

                    children.forEach((val: ChildInfoType) => {
                      formData.append('child-info[][first_name]', encodeURIComponent(val.first_name));
                      formData.append('child-info[][last_name]', encodeURIComponent(val.last_name));
                      formData.append('child-info[][school_attending]', encodeURIComponent(val.school_attending));
                      formData.append('child-info[][child_classification]', encodeURIComponent('pre-schooler'));
                      formData.append('child-info[][dob]', encodeURIComponent(format(new Date(val.birthdate!), 'yyyy-M-d')));
                    });
                    formData.append('year_cycle', encodeURIComponent(yearCycle))

                    formData.append('start_date', encodeURIComponent(format(new Date(startDate!), 'yyyy-M-d')));

                    WEEK_DAYS.forEach((val: string) => {
                      formData.append(`before_school_${val.toLowerCase()}`, encodeURIComponent(beforeSchool.includes(val)))
                    })

                    WEEK_DAYS.forEach((val: string) => {
                      formData.append(`after_school_${val.toLowerCase()}`, encodeURIComponent(afterSchool.includes(val)))
                    });

                    formAction(formData);
                  }

                }
              }
            }
          }
        }
        break;
    }
  }, [
    stepInNumber,
    formState,
    program_type,
    cardDetails,
    children,
    location?.id
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
    <form className="space-y-6"
      ref={formRef}
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let formData = new FormData(event.currentTarget);

        switch (stepInNumber) {
          case 1: formAction(formData); break;
          case 2: formAction(formData); break;
          case 3: formAction(formData); break;
          case 4:
            if (program_type === 'before-or-after-school') {
              formAction(formData);
            }
            break;
          case 5:
            if (program_type === 'before-or-after-school') {
              formAction(formData);
            }
            break;
        }
      }}>
      <StepperPanel />
      <FillInFormButtons program_type={program_type}
        step={step}
        formAction={formAction}
        cardDetails={cardDetails} />
    </form>
  )
}