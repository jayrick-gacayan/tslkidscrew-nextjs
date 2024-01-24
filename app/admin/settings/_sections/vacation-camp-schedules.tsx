'use client';

import CustomInput from "@/app/_components/custom-input";
import { ValidationType } from "@/types/enums/validation-type";
import { Listbox, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { capitalCase, noCase } from "change-case";
import { useState } from "react";

export default function VacationCampSchedules() {
  const [camp, setCamp] = useState('camp-1');

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="flex-1">
          <h1 className="font-medium text-[24px] text-black">Update Schedules</h1>
        </div>
        <div className="flex-none">
          <div className="relative">
            <Listbox value={camp} onChange={(value: string) => { setCamp(value); }}>
              <Listbox.Button
                as="div"
                className="bg-primary rounded text-white flex items-center w-full justify-between">
                {
                  ({ open }) => {
                    return (
                      <>
                        <div className="px-3 py-2">{capitalCase(noCase(camp))}</div>
                        <div className="px-3 py-2">
                          <Icon icon='fa6-solid:chevron-down'
                            className={`fill-white transition-all duration-200 ${open ? '-rotate-90' : 'rotate-0'}`} />
                        </div>
                      </>
                    )
                  }
                }
              </Listbox.Button>
              <Transition enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0">
                <Listbox.Options as='div'
                  className="absolute top-[105%] left-0 w-full bg-white rounded drop-shadow overflow-hidden">
                  {
                    [1, 2, 3].map((numVal) => { return 'camp-' + numVal; })
                      .map((value: any, index: any) => (
                        <Listbox.Option
                          as='div'
                          key={`show-camp-rates-summer-camps-${value}${index}`}
                          className={({ selected, active }) => {
                            return `px-3 py-2 hover:cursor-pointer hover:bg-primary hover:text-white ${selected ? 'bg-primary text-white' : 'bg-white text-black'}`
                          }}
                          value={value}>
                          {capitalCase(noCase(value))}
                        </Listbox.Option>
                      ))}
                </Listbox.Options>
              </Transition>
            </Listbox>
          </div>


        </div>
      </div>
      <div className="block bg-secondary p-4">
        <div className="w-4/12 block space-y-4">
          <CustomInput labelText='Name'
            fieldInput={{ value: '', errorText: '', validationStatus: ValidationType.NONE }}
            type='text'
            onChange={(value: string) => { return; }}
            className="bg-white" />
          <CustomInput labelText='Capacity'
            fieldInput={{ value: '', errorText: '', validationStatus: ValidationType.NONE }}
            type='text'
            inputMode="numeric"
            onChange={(value: string) => { return; }}
            className="bg-white" />
          <CustomInput labelText='Year'
            fieldInput={{ value: '2024', errorText: '', validationStatus: ValidationType.NONE }}
            type='text'
            onChange={(value: string) => { return; }}
            className="bg-white" />
        </div>
      </div>
    </div>
  )
}