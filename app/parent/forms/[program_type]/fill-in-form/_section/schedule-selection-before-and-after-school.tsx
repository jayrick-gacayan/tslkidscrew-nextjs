'use client';

import { useState } from "react";
import FormsRadioButton from "../_components/forms-radio-button";
import { PhInfoLight } from "@/app/_components/svg/ph-info-light";

export default function ScheduleSelectionBeforeAndAfterSchool() {
  const [yearCycle, setYearCycle] = useState('');

  function renderRadio(value: string, current: string) {
    return (
      <span className="rounded-full border border-warning h-5 w-5 p-1">
        <span className={`transition-all duration-100 ${value === current ? 'bg-warning' : 'bg-transparent'} h-full w-full block rounded-full`} />
      </span>
    )
  }
  return (
    <div className="space-y-8">
      <div className="space-y-2 text-black">
        <h1 className="font-medium text-[36px]">Schedule&#39;s Selection</h1>
        <div className="flex items-center gap-2">
          <div className="flex-none">
            <PhInfoLight className="text-warning text-[24px]" />
          </div>
          <div>Please note that each year cycle has its own set of rates.</div>
        </div>
      </div>
      <div className="space-y-2">
        <FormsRadioButton labelText='2022 September - 2023 June'
          value='2022-2023'
          current={yearCycle}
          labelClassName='transition-all duration-100 has-[:checked]:bg-primary has-[:checked]:text-white rounded flex px-4 py-4 gap-2 items-center bg-secondary-light cursor-pointer'
          onChange={(value: string) => { setYearCycle(value); }}
          renderRadio={renderRadio} />
        <FormsRadioButton labelText='2023 September - 2024 June'
          value='2024-2024'
          current={yearCycle}
          renderRadio={renderRadio}
          labelClassName='transition-all duration-100 has-[:checked]:bg-primary has-[:checked]:text-white rounded flex px-4 py-4 gap-2 items-center bg-secondary-light cursor-pointer'
          onChange={(value: string) => { setYearCycle(value); }} />
      </div>
    </div>
  )
}