'use client';

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

export function NewFormLocation() {
  const [director, setDirector] = useState<any>(undefined);

  return (
    <>
      <div className="space-y-4">
        <CustomInput labelText='Name'
          fieldInput={{ value: '', errorText: '', validationStatus: ValidationType.NONE }}
          type='text'
          onChange={(value: string) => { return; }} />
        <CustomInput labelText='Address'
          fieldInput={{ value: '', errorText: '', validationStatus: ValidationType.NONE }}
          type='text'
          onChange={(value: string) => { return; }} />
        <label className="space-y-[2px] relative">
          <p className="font-semibold text-black">Director</p>
          <CustomListboxHeadless value={director}
            placeholder='Director'
            onChange={(value: any) => {
              setDirector(value)
            }}
            items={directorItems}
            by="id" />
        </label>
        <CustomInput labelText='Minimum Age For Children'
          fieldInput={{ value: '', errorText: '', validationStatus: ValidationType.NONE }}
          type='text'
          inputMode="numeric"
          onChange={(value: string) => { return; }} />

      </div>
      <div className="w-1/2 block m-auto">
        <button className="bg-primary p-2 rounded text-white w-fit block m-auto">Submit</button>
      </div>
    </>
  )
}