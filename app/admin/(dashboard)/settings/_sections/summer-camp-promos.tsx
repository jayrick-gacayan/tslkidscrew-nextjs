'use client';

import CustomCheckbox from "@/app/_components/custom-checkbox";
import InputCustom from "@/app/_components/input-custom";
import { Fa6SolidChevronDown } from "@/app/_components/svg/fa6-solid-chevron-down";
import { Listbox, Transition } from "@headlessui/react";
import { capitalCase, noCase } from "change-case";
import { useState } from "react";

export default function SummerCampPromos() {
  const [week, setWeek] = useState('week-1');

  return (
    <div className="space-y-4 pt-4">
      <div className="flex sm:flex-row flex-col items-start gap-2 sm:items-center">
        <div className="flex-1">
          <h1 className="font-medium text-[24px] text-black">Update Promos</h1>
        </div>
        <div className="flex-none sm:w-auto w-full">
          <div className="flex w-full sm:w-64 items-center gap-4">
            <div className="w-full">
              <CustomCheckbox value={false} onChange={(value: boolean) => { return }} text='Enabled' />
            </div>
            <div className="relative w-full">
              <Listbox value={week} onChange={(value: string) => { setWeek(value); }}>
                <Listbox.Button
                  as="div"
                  className="bg-primary rounded text-white flex items-center w-full justify-between">
                  {
                    ({ open }) => {
                      return (
                        <>
                          <div className="px-3 py-2">{capitalCase(noCase(week))}</div>
                          <div className="px-3 py-2">
                            <Fa6SolidChevronDown className={`fill-white transition-all duration-200 ${open ? '-rotate-90' : 'rotate-0'}`} />
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
                      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((numVal) => { return 'week-' + numVal; })
                        .map((value: any, index: any) => (
                          <Listbox.Option
                            as='div'
                            key={`show-week-rates-summer-camps-${value}${index}`}
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
      </div>
      <div className="block bg-secondary p-4">
        <div className="w-full sm:w-8/12 block space-y-4">
          {
            [1, 2, 3].map((value) => {
              return (
                <div key={`update-promos-children-${value}`}
                  className="flex sm:flex-row flex-col items-center justify-between gap-4 sm:gap-8">
                  <div className="w-full">
                    <h1 className="font-medium text-[20px]">
                      Children #{value}
                    </h1>
                  </div>
                  <div className="w-full">
                    <InputCustom type="text"
                      inputMode="numeric"
                      className="bg-white" />
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}