'use client';

import ChildrenForm from "./children-form";
import LocationForm from "./location-form";
import PaymentFormContainer from "./payment-form-container";
import StepThreeForm from "./step-three-form";

export default function FillInFormContainer({
  program_type,
  step,
}: {
  program_type: string;
  step: string | undefined;
}) {

  const stepInNumber = !step ? 1 : parseInt(step);
  const highestStep = program_type === 'before-or-after-school' ? 5 : 4;

  return (
    <>
      {
        stepInNumber === 1 ? <LocationForm /> :
          stepInNumber === 2 ? <ChildrenForm /> :
            stepInNumber === 3 ? <StepThreeForm program_type={program_type} /> :
              stepInNumber === highestStep ? <PaymentFormContainer program_type={program_type} /> : null

      }
    </>
  );
}