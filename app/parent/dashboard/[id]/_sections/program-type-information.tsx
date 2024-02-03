import BeforeOrAfterSchoolWeekdays from "../_components/before-or-after-school-weekdays";

export default function ProgramTypeInformation() {
  let beforeSchoolWeekdays = [
    { day: 'Monday', dayChecked: true },
    { day: 'Tuesday', dayChecked: true },
    { day: 'Wednesday', dayChecked: true },
    { day: 'Thursday', dayChecked: true },
    { day: 'Friday', dayChecked: false },
  ];

  let afterSchoolWeekdays = [
    { day: 'Monday', dayChecked: false },
    { day: 'Tuesday', dayChecked: false },
    { day: 'Wednesday', dayChecked: false },
    { day: 'Thursday', dayChecked: false },
    { day: 'Friday', dayChecked: false },
  ];

  return (
    <div className="space-y-4 w-full">
      <p className="text-tertiary">BEFORE OR AFTER INFORMATION</p>
      <div className="flex min-[1184px]:flex-row flex-col items-center gap-8">
        <BeforeOrAfterSchoolWeekdays labelText='Before School' data={beforeSchoolWeekdays} />
        <BeforeOrAfterSchoolWeekdays labelText='After School' data={afterSchoolWeekdays} />
      </div>

    </div>
  )
}