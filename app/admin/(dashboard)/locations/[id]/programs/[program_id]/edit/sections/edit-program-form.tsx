'use client';

import CustomCheckbox from "@/app/_components/custom-checkbox";
import CustomListboxHeadless from "@/app/_components/custom-listbox-headless";
import InputCustom from "@/app/_components/input-custom";
import { useState } from "react";

let directorItems = [
  { id: 1, email: "alexisLarose.tsl@gmail.com" },
  { id: 2, email: "jake.tsl@gmail.com" },
  { id: 3, email: "missmaria.tsl@gmail.com" },
  { id: 4, email: "rhay26.tsl@gmail.com" },
  { id: 5, email: "peter.harding.tsl@gmail.com" },
];
let programTypes = ['Before/After School', 'Summer Camp', 'Vacation Camp']

export default function EditProgramForm() {
  const [director, setDirector] = useState<any>(undefined);
  const [programType, setProgramType] = useState<string>('');

  return (
    <>
      <div className="space-y-4">
        <InputCustom labelText="Location"
          id='location-name'
          name='location-name'
          type="text"
          className="bg-secondary border-transparent p-2 px-3"
          placeholder="Location:"
          value='Sample'
          disabled />
        <InputCustom labelText="Program Name"
          id='location-program-name'
          name='program-name'
          type="text"
          className="bg-secondary border-transparent p-2 px-3"
          placeholder="Program Name:" />
        <InputCustom labelText="Program Suffix"
          id='location-program-name-suffix'
          name='program-name-suffix'
          type="text"
          className="bg-secondary border-transparent p-2 px-3"
          placeholder="Program Suffix:" />
        <div className="space-y-[2px] relative">
          <p className="font-semibold text-black">Director</p>
          <CustomListboxHeadless value={director}
            placeholder='Director'
            onChange={(value: any) => {
              setDirector(value)
            }}
            items={directorItems}
            by='id' />
        </div>
        <div className="flex items-center gap-2 w-full">
          <div className="w-full">
            <InputCustom labelText="Capacity"
              id='location-program-capacity'
              name='program-capacity'
              type="text"
              inputMode="numeric"
              className="bg-secondary border-transparent p-2 px-3"
              placeholder="Capacity:" />
          </div>
          <div className="w-full">
            <InputCustom labelText="Price"
              id='location-program-price'
              name='program-price'
              type="text"
              inputMode="numeric"
              className="bg-secondary border-transparent p-2 px-3"
              placeholder="Price:" />
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