'use client';

import CustomInput from "@/app/_components/custom-input";
import { ValidationType } from "@/types/enums/validation-type";
import { useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";


export default function ChildrenForm() {
  let today = new Date();

  const [value, setValue] = useState({
    startDate: new Date("2019-01-26"),
    endDate: null
  });

  const handleValueChange = (newValue: any) => {
    setValue(newValue);
  }

  function setDate(date: Date, year: number) {
    date.setFullYear(date.getFullYear() - year);

    return date;
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-black">
        <h1 className="font-medium text-[36px]">Child/ren's Information</h1>
        <p>Accepting children 5 years old and up at this location.</p>
      </div>
      <div className="w-full rounded border border-secondary-light p-4 h-96 space-y-4">
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
          <Datepicker maxDate={new Date("2019-01-26")}

            useRange={false}
            asSingle={true}
            value={value}
            inputClassName='w-full rounded font-normal text-black bg-secondary p-4 border-0 focus:border-none'
            onChange={(value: DateValueType, e?: HTMLInputElement | null | undefined) => {
              handleValueChange(value);
            }} />
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
      <div className="w-fit ml-auto block space-x-4">
        <button className="p-2 text-danger rounded border border-danger">Cancel</button>
        <button className="p-2 bg-primary text-white rounded">Next</button>
      </div>
    </div>
  )
}