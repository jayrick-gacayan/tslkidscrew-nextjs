'use client';

import StepThreeFormBeforeAndAfterSchool from "./step-three-form-before-and-after-school";
import StepThreeFormSummerCamp from "./step-three-form-summer-camp";
import StepThreeFormVacationCamp from "./step-three-form-vacation-camp";

export default function StepThreeForm({
  program_type
}: {
  program_type: string;
}) {

  switch (program_type) {
    case 'before-or-after-school': return <StepThreeFormBeforeAndAfterSchool />;
    case 'summer-camp': return <StepThreeFormSummerCamp />
    case 'vacation-camp': return <StepThreeFormVacationCamp />;
  }
  return null;
}