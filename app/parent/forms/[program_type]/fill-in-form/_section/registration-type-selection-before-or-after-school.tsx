'use client';

import CustomCheckbox from "@/app/_components/custom-checkbox";
import { useState } from "react";
import DatePicker from "react-datepicker";
import CustomInputDefault from "@/app/_components/react-datepicker/custom-input-default";
import calendarContainer from "@/app/_components/react-datepicker/calendar-container";
import renderCustomHeaderDefault from "@/app/_components/react-datepicker/render-custom-header-default";

export default function RegistrationTypeSelectionBeforeOrAfterSchool() {
  const [registerStartDate, setRegisterStartDate] = useState<Date | null>(null)

  return (
    <div className="space-y-8">
      <h1 className="font-medium text-[36px]">Registration Type Selection</h1>
      <div className="space-y-6">
        <div className="relative space-y-1">
          <div className="font-medium">Start Date</div>
          <DatePicker selected={registerStartDate}
            customInput={<CustomInputDefault />}
            onChange={(date) => { setRegisterStartDate(date) }}
            calendarContainer={calendarContainer}
            formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 3)}
            renderCustomHeader={renderCustomHeaderDefault} />
        </div>
        <div className="space-y-6">
          <div className='block space-y-2'>
            <h4 className="font-medium">Before School:</h4>
            <div className="flex lg:flex-row flex-col items-start lg:items-center gap-4">
              <CustomCheckbox value={false} text='Monday' />
              <CustomCheckbox value={false} text='Tuesday' />
              <CustomCheckbox value={false} text='Wednesday' />
              <CustomCheckbox value={false} text='Thursday' />
              <CustomCheckbox value={false} text='Friday' />
            </div>
          </div>
          <div className='block space-y-2'>
            <h4 className="font-medium">After School:</h4>
            <div className="flex lg:flex-row flex-col items-start lg:items-center gap-4">
              <CustomCheckbox value={false} text='Monday' />
              <CustomCheckbox value={false} text='Tuesday' />
              <CustomCheckbox value={false} text='Wednesday' />
              <CustomCheckbox value={false} text='Thursday' />
              <CustomCheckbox value={false} text='Friday' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}