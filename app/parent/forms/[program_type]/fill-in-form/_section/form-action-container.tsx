'use client';

import { useFormState } from "react-dom";
import FillInFormButtons from "./fill-in-form-buttons";
import { fillInFormAction } from "../../../../../../actions/registration-create-action";
import ChildrenForm from "./children-form";
import LocationForm from "./location-form";
import PaymentFormContainer from "./payment-form-container";
import RegistrationTypeSelectionBeforeOrAfterSchool from "./registration-type-selection-before-or-after-school";
import StepThreeForm from "./step-three-form";
import { FormEvent, useEffect } from "react";
import { useFillInFormHook } from "../_context/use-fill-in-form-hook";
import { LocationPlace } from "@/models/location";
import { redirectToPath } from "@/actions/common-actions";
import { format } from 'date-fns';

export default function FormActionContainer({
  program_type,
  step,
  locations,
}: {
  program_type: string;
  step: string | undefined;
  locations: Partial<LocationPlace>[]
}) {
  const {
    state,
    setLocation,
    setYearCycle,
    setStartDate,
    setWeekDayBOASError,
    setTOSError,
    stripeModalToggle
  } = useFillInFormHook();

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
    async function pathToRedirectURL(numberStep: number) {
      let url = `/parent/forms/${program_type}/fill-in-form${numberStep === 1 ? `` : `?step=${numberStep}`}`
      await redirectToPath(url);
    }

    let { stepOne, stepTwo, stepThree, stepFour, stepFive, ...rest } = formState;

    switch (stepInNumber) {
      case 1:
        if (stepOne) { pathToRedirectURL(stepInNumber + 1) }
        else {
          if (formState?.['location-place[id]']) {
            setLocation({
              value: undefined,
              errorText: formState?.['location-place[id]']?.errorText,
              validationStatus: formState?.['location-place[id]']?.validationStatus
            })
          }
        }
        break;
      case 2:
        if (!stepOne) { pathToRedirectURL(stepInNumber - 1) }
        else {
          if (stepTwo) { pathToRedirectURL(stepInNumber + 1) }

        }
        break;
      case 3:
        if (!stepTwo) { pathToRedirectURL(stepInNumber - 1) }
        else {
          if (stepThree) { pathToRedirectURL(stepInNumber + 1) }
          else {
            switch (program_type) {
              case 'before-or-after-school':
                if (formState?.['year-cycle']) {
                  setYearCycle({
                    value: '',
                    errorText: formState?.['year-cycle']?.errorText,
                    validationStatus: formState?.['year-cycle']?.validationStatus
                  })
                }
                break;
            }
          }
        }
        break;
      case 4:
        if (!stepThree) {
          pathToRedirectURL(stepInNumber - 1)
        }
        else {
          switch (program_type) {
            case 'before-or-after-school':
              if (!stepFour) {
                if (formState?.['start-date']) {
                  setStartDate({
                    value: undefined,
                    errorText: formState?.['start-date']?.errorText,
                    validationStatus: formState?.['start-date']?.errorText
                  })
                }

                if (formState?.['before-or-after-week-days']) {
                  setWeekDayBOASError({
                    errorText: formState?.['before-or-after-week-days']?.errorText,
                    validationStatus: formState?.['before-or-after-week-days']?.validationStatus
                  })
                }
              }
              else {
                pathToRedirectURL(stepInNumber + 1)
              }
              break;
          }
        }
        break;
      case 5:
        if (program_type === 'before-or-after-school') {
          if (!stepFour) {
            pathToRedirectURL(stepInNumber - 1)
          }
          else {
            setTOSError(formState?.['payment-tos-terms-error'] ?? '')

            if (formState?.hasStripeCard !== undefined) {
              if (!formState.hasStripeCard) {
                stripeModalToggle()
              }
              else {

                let formData = new FormData();

                formData.set('location_id', encodeURIComponent(state?.fillInForm?.location?.value?.id!))
                formData.set('start_date', format(state?.fillInForm?.startDate, 'd LLL yyyy'))

                let beforeSchool = state?.fillInForm?.beforeOrAfterWeekDays?.value?.beforeSchool;
                let afterSchool = state?.fillInForm?.beforeOrAfterWeekDays?.value?.afterSchool;

                if (beforeSchool.length > 0) {

                  formData.set('before_school_monday', encodeURIComponent(beforeSchool.includes('Monday')));
                  formData.set('before_school_tuesday', encodeURIComponent(beforeSchool.includes('Tuesday')));
                  formData.set('before_school_wednesday', encodeURIComponent(beforeSchool.includes('Wednesday')));
                  formData.set('before_school_thursday', encodeURIComponent(beforeSchool.includes('Thursday')));
                  formData.set('before_school_friday', encodeURIComponent(beforeSchool.includes('Friday')));
                }

                if (afterSchool.length > 0) {

                  formData.set('after_school_monday', encodeURIComponent(afterSchool.includes('Monday')));
                  formData.set('after_school_tuesday', encodeURIComponent(afterSchool.includes('Tuesday')));
                  formData.set('after_school_wednesday', encodeURIComponent(afterSchool.includes('Wednesday')));
                  formData.set('after_school_thursday', encodeURIComponent(afterSchool.includes('Thursday')));
                  formData.set('after_school_friday', encodeURIComponent(afterSchool.includes('Friday')));
                }

                formAction(formData);

                // state?.fillInForm?.children?.forEach((val: any) => {
                //   formData.set('children[][firstname]', encodeURIComponent(val.first_name))
                //   formData.set('children[][lastname]', encodeURIComponent(val.first_name))
                //   formData.set('children[][firstname]', encodeURIComponent(val.first_name))
                //   formData.set('children[][firstname]', encodeURIComponent(val.first_name))

                // })
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
  ]);

  console.log('state', state, stepInNumber)

  function StepperPanel() {
    if (stepInNumber === 1) return (<LocationForm locations={locations} />)
    else if (stepInNumber === 2) return (<ChildrenForm />);
    else if (stepInNumber === 3) return (<StepThreeForm program_type={program_type} />);
    else if (stepInNumber === 4 && program_type === 'before-or-after-school')
      return (<RegistrationTypeSelectionBeforeOrAfterSchool />)
    else if (stepInNumber === highestStep)
      return (<PaymentFormContainer program_type={program_type} />)

    return null;
  }


  return (
    <form className="space-y-6"
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
      <FillInFormButtons program_type={program_type} step={step} formAction={formAction} />
    </form>
  )
}