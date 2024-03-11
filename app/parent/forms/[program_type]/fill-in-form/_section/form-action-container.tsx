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
import { LocationPlace } from "@/models/location-place";
import { redirectToPath } from "@/actions/common-actions";
import { Parent } from "@/models/parent";
import { reduxStore } from "@/react-redux/redux-store";
import { beforeOrAfterSchoolStartDateChanged, beforeOrAfterWeekDaysSetError, locationChanged, modalStripeToggled, tosConditionChanged, yearCycleChanged } from "../_redux/fill-in-form-slice";

export default function FormActionContainer({
  program_type,
  step,
  locations,
  cardDetails,
}: {
  program_type: string;
  step: string | undefined;
  locations: Partial<LocationPlace>[];
  cardDetails: Partial<Parent> | undefined;
}) {

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
            let { errorText, validationStatus } = formState?.['location-place[id]']
            reduxStore.dispatch(locationChanged({ value: undefined, errorText, validationStatus }))
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
                  let { errorText, validationStatus } = formState?.['year-cycle'];
                  reduxStore.dispatch(yearCycleChanged({ value: '', errorText, validationStatus }))
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
                  let { errorText, validationStatus } = formState?.['start-date'];
                  reduxStore.dispatch(beforeOrAfterSchoolStartDateChanged({ value: undefined, errorText, validationStatus }))
                }

                if (formState?.['before-or-after-week-days']) {
                  let { errorText, validationStatus } = formState?.['before-or-after-week-days'];
                  reduxStore.dispatch(beforeOrAfterWeekDaysSetError({ errorText, validationStatus }))
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
  ]);

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
      <FillInFormButtons program_type={program_type}
        step={step}
        formAction={formAction}
        cardDetails={cardDetails} />
    </form>
  )
}