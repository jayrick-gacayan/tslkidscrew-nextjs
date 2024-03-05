'use client';

import { useFormState } from "react-dom";
import FillInFormButtons from "./fill-in-form-buttons";
import { fillInFormAction } from "../../../../../../actions/registration-create-action";
import ChildrenForm from "./children-form";
import LocationForm from "./location-form";
import PaymentFormContainer from "./payment-form-container";
import RegistrationTypeSelectionBeforeOrAfterSchool from "./registration-type-selection-before-or-after-school";
import StepThreeForm from "./step-three-form";
import { FormEvent, useCallback, useEffect } from "react";
import { useFillInFormHook } from "../_context/use-fill-in-form-hook";
import { useRouter } from "next/navigation";
import { LocationPlace } from "@/models/location";

export default function FormActionContainer({
  program_type,
  step,
  locations,
}: {
  program_type: string;
  step: string | undefined;
  locations: Partial<LocationPlace>[]
}) {
  const router = useRouter();

  const stepInNumber = !step ? 1 : parseInt(step);
  const highestStep = program_type === 'before-or-after-school' ? 5 : 4;
  const [formState, formAction] = useFormState(
    fillInFormAction.bind(null, stepInNumber, program_type),
    program_type === 'before-or-after-school' ?
      {
        stepOne: false,
        stepTwo: false,
        stepThree: false,
        stepFour: false,
        stepFive: false,
      } as any :
      {
        stepOne: false,
        stepTwo: false,
        stepThree: false,
        stepFour: false,
      } as any
  );

  const programTypePath = useCallback((numberStep: number) => {
    router.push(`/parent/forms/${program_type}/fill-in-form${numberStep === 1 ? `` : `?step=${numberStep}`}`);
  }, [program_type, router]);

  useEffect(() => {
    switch (stepInNumber) {
      case 1:
        if (formState.stepOne !== undefined && formState.stepOne) {

          programTypePath(stepInNumber + 1);
        }
        break;
      case 2:
        if (!formState.stepOne) {
          programTypePath(stepInNumber - 1);
        }
        else {
          if (formState.stepTwo !== undefined && formState.stepTwo) {

            programTypePath(stepInNumber + 1);
          }
        }

        break;
    }
  }, [
    stepInNumber,
    formState,
    programTypePath,
  ])

  console.log('here state', formState)

  function StepperPanel() {
    if (stepInNumber === 1) {
      return (
        <LocationForm locationState={formState?.['location-place[id]']}
          locations={locations} />
      )
    }
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
        }
      }}>
      <StepperPanel />
      <FillInFormButtons program_type={program_type} step={step} programTypePath={programTypePath} formAction={formAction} />
    </form>
  )
}