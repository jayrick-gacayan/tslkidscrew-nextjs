'use client';

import ScheduleSelectionBeforeAndAfterSchool from "./schedule-selection-before-and-after-school";
import StepThreeFormSummerCamp from "./step-three-form-summer-camp";
import AttendanceScheduleVacationCamp from "./attendance-schedule-vacation-camp";

export default function StepThreeForm({
  program_type
}: {
  program_type: string;
}) {

  switch (program_type) {
    case 'before-or-after-school': return <ScheduleSelectionBeforeAndAfterSchool />;
    case 'summer-camp': return <StepThreeFormSummerCamp />
    case 'vacation-camp': return <AttendanceScheduleVacationCamp />;
  }
  return null;
}