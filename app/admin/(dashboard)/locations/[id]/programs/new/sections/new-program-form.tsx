'use client';

import CustomCheckbox from "@/app/_components/custom-checkbox";
import CustomInput from "@/app/_components/custom-input";
import CustomListboxHeadless from "@/app/_components/custom-listbox-headless";
import { ValidationType } from "@/types/enums/validation-type";
import { useState } from "react";

let directorItems = [
  { id: 1, email: "alexisLarose.tsl@gmail.com" },
  { id: 2, email: "jake.tsl@gmail.com" },
  { id: 3, email: "missmaria.tsl@gmail.com" },
  { id: 4, email: "rhay26.tsl@gmail.com" },
  { id: 5, email: "peter.harding.tsl@gmail.com" },
];

let programTypes = ['Before/After School', 'Summer Camp', 'Vacation Camp']

export default function NewProgramForm() {
  const [director, setDirector] = useState<any>(undefined);
  const [programType, setProgramType] = useState<string>('');

  return (
    <>
      <div className="space-y-4">
        <CustomInput labelText='Location'
          fieldInput={{ value: 'Sample', errorText: '', validationStatus: ValidationType.NONE }}
          type='text'
          disabled={true} />
        <CustomInput labelText='Program Name'
          fieldInput={{ value: '', errorText: '', validationStatus: ValidationType.NONE }}
          type='text'
          onChange={(value: string) => { return; }} />
        <CustomInput labelText='Suffix'
          fieldInput={{ value: '', errorText: '', validationStatus: ValidationType.NONE }}
          type='text'
          onChange={(value: string) => { return; }} />
        <div className="space-y-[2px] relative">
          <p className="font-semibold text-black">Program Type</p>
          <CustomListboxHeadless value={programType}
            placeholder='Program Type'
            onChange={(value: any) => {
              setProgramType(value)
            }}
            items={programTypes} />
        </div>
        <div className="space-y-[2px] relative">
          <p className="font-semibold text-black">Director</p>
          <CustomListboxHeadless value={director}
            placeholder='Director'
            onChange={(value: any) => {
              setDirector(value)
            }}
            items={directorItems}
            by="id" />
        </div>
        <div className="flex items-center gap-2 w-full">
          <div className="w-full">
            <CustomInput labelText='Capacity'
              fieldInput={{ value: '', errorText: '', validationStatus: ValidationType.NONE }}
              type='text'
              inputMode="decimal"
              onChange={(value: string) => { return; }} />
          </div>
          <div className="w-full">
            <CustomInput labelText='Price'
              fieldInput={{ value: '', errorText: '', validationStatus: ValidationType.NONE }}
              type='text'
              inputMode="decimal"
              onChange={(value: string) => { return; }} />
          </div>
        </div>
        <CustomCheckbox value={false}
          onChange={(value: boolean) => { return }}
          text='Promo Package Enabled' />
        <CustomCheckbox value={false}
          onChange={(value: boolean) => { return }}
          text='Active' />
      </div>
      <div className="w-1/2 block m-auto">
        <button className="bg-primary p-2 rounded text-white w-fit block m-auto">Submit</button>
      </div>
    </>
  )
}