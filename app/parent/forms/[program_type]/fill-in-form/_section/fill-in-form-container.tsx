'use client';

import ChildrenForm from "./children-form";
import LocationForm from "./location-form";
import StepThreeForm from "./step-three-form";

export default function FillInFormContainer({
  program_type,
  step,
}: {
  program_type: string;
  step: string | undefined;
}) {

  return (
    <>
      {
        !step || step === '1' ? <LocationForm /> :
          step === '2' ? <ChildrenForm /> :
            step === '3' ? <StepThreeForm program_type={program_type} /> : null
      }
    </>
  );
}