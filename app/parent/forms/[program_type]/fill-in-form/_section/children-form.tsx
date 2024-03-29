'use client';

import InputCustom from "@/app/_components/input-custom";
import calendarContainer from "@/app/_components/react-datepicker/calendar-container";
import CustomInputDefault from "@/app/_components/react-datepicker/custom-input-default";
import renderCustomHeaderDefault from "@/app/_components/react-datepicker/render-custom-header-default";
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
          <InputCustom
            id='children-firstname'
            name='children-firstname'
            type="text"
            className="bg-secondary p-4 border-transparent"
            placeholder="Firstname:" />
          <InputCustom
            id='children-lastname'
            name='children-lastname'
            type="text"
            className="bg-secondary p-4 border-transparent"
            placeholder="Lastname:" />
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
        <InputCustom
          id='children-school-attending'
          name='children-school-attending'
          type="text"
          className="bg-secondary p-4 border-transparent"
          placeholder="School Attending:" />
        <div>
          <button className="p-3 text-white w-full rounded bg-primary">Add Child</button>
        </div>
      </div>
    </div>
  )
}