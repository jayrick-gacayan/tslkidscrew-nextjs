'use client';

import { useFormState } from "react-dom";
import FillInFormButtons from "./fill-in-form-buttons";
import FillInFormContainer from "./fill-in-form-container";
import { fillInForm } from "../_actions/fill-in-form";
import ChildrenForm from "./children-form";
import LocationForm from "./location-form";
import PaymentFormContainer from "./payment-form-container";
import RegistrationTypeSelectionBeforeOrAfterSchool from "./registration-type-selection-before-or-after-school";
import StepThreeForm from "./step-three-form";

export default function FormActionContainer({
  program_type,
  step,
}: {
  program_type: string;
  step: string | undefined;
}) {
  // fillInForm.bind(null, stepInNumber, program_type)
  const stepInNumber = !step ? 1 : parseInt(step);
  const highestStep = program_type === 'before-or-after-school' ? 5 : 4;
  const [formState, formAction] = useFormState((prevState: any, formData: FormData) => {
    fillInForm(stepInNumber, program_type, prevState, formData);
  }, {} as any);


  return (
    <form action={formAction} className="space-y-6">
      <>
        {
          stepInNumber === 1 ? <LocationForm loc={formState.location} /> :
            stepInNumber === 2 ? <ChildrenForm /> :
              stepInNumber === 3 ? <StepThreeForm program_type={program_type} /> :
                stepInNumber === 4 && program_type === 'before-or-after-school' ? <RegistrationTypeSelectionBeforeOrAfterSchool /> :
                  stepInNumber === highestStep ? <PaymentFormContainer program_type={program_type} /> : null

        }
      </>
      <FillInFormButtons program_type={program_type} step={step} />
    </form>
  )
}