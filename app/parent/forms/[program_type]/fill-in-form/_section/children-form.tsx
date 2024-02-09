'use client';

import CustomInput from "@/app/_components/custom-input";
import calendarContainer from "@/app/_components/react-datepicker/calendar-container";
import CustomInputDefault from "@/app/_components/react-datepicker/custom-input-default";
import renderCustomHeaderDefault from "@/app/_components/react-datepicker/render-custom-header-default";
import { ValidationType } from "@/types/enums/validation-type";
import { useState } from "react";
import DatePicker from "react-datepicker";

let today = new Date();
let defaultDate = new Date(new Date(today.getFullYear() - 5, today.getMonth(), today.getDate()))

export default function ChildrenForm() {
  const [birthdate, setBirthdate] = useState<Date | null>(defaultDate);

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-black">
        <h1 className="font-medium text-[36px]">Child&#47;ren&#39;s Information</h1>
        <p>Accepting children 5 years old and up at this location.</p>
      </div>
      <div className="w-full rounded border border-secondary-light p-4 space-y-4">
        <div className="flex items-center gap-4">
          <CustomInput
            fieldInput={{ value: '', errorText: '', validationStatus: ValidationType.NONE }}
            onChange={(value: string) => { }}
            type='text'
            className="p-3"
            placeholder="Firstname" />
          <CustomInput
            fieldInput={{ value: '', errorText: '', validationStatus: ValidationType.NONE }}
            onChange={(value: string) => { }}
            type='text'
            className="p-3"
            placeholder="Lastname" />
        </div>
        <div className="relative w-full">
          <div className="relative space-y-1">
            <div className="font-medium">Start Date</div>
            <DatePicker selected={birthdate}
              customInput={<CustomInputDefault />}
              onChange={(date) => { setBirthdate(date) }}
              calendarContainer={calendarContainer}
              formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 3)}
              renderCustomHeader={renderCustomHeaderDefault} />
          </div>
        </div>
        <CustomInput
          fieldInput={{ value: '', errorText: '', validationStatus: ValidationType.NONE }}
          onChange={(value: string) => { }}
          type='text'
          className="p-3"
          placeholder="School Attending" />
        <div>
          <button className="p-3 text-white w-full rounded bg-primary">Add Child</button>
        </div>
      </div>
    </div>
  )
}