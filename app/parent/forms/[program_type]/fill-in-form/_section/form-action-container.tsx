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

export default function FormActionContainer({
  program_type,
  step,
}: {
  program_type: string;
  step: string | undefined;
}) {
  const router = useRouter();
  const { state } = useFillInFormHook();

  const stepInNumber = !step ? 1 : parseInt(step);
  const highestStep = program_type === 'before-or-after-school' ? 5 : 4;
  const [formState, formAction] = useFormState(
    fillInFormAction.bind(null, stepInNumber, program_type),
    {} as any
  );

  const programTypePath = useCallback((numberStep: number) => {
    router.push(`/parent/forms/${program_type}/fill-in-form${numberStep === 1 ? `` : `?step=${numberStep}`}`);
  }, [program_type, router]);

  useEffect(() => {
    switch (stepInNumber) {
      case 1:
        if (formState.success !== undefined && formState.success) {

          programTypePath(stepInNumber + 1);
        }
        break;
      case 2:
        if (formState.success !== undefined && formState.success) {

          programTypePath(stepInNumber + 1);
        }
        break;
    }
  }, [
    stepInNumber,
    formState,
    programTypePath,
  ])

  console.log('here state', formState)

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
      <>
        {
          stepInNumber === 1 ? <LocationForm locationState={formState?.['location-place[id]']} /> :
            stepInNumber === 2 ? <ChildrenForm /> :
              stepInNumber === 3 ? <StepThreeForm program_type={program_type} /> :
                stepInNumber === 4 && program_type === 'before-or-after-school' ? <RegistrationTypeSelectionBeforeOrAfterSchool /> :
                  stepInNumber === highestStep ? <PaymentFormContainer program_type={program_type} /> : null

        }
      </>
      <FillInFormButtons program_type={program_type} step={step} programTypePath={programTypePath} />
    </form>
  )
}