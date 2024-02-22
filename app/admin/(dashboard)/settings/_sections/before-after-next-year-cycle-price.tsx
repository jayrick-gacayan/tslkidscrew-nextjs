'use client';

import { Fa6SolidChevronDown } from "@/app/_components/svg/fa6-solid-chevron-down";
import { Listbox, Transition } from "@headlessui/react";
import { capitalCase, noCase } from "change-case";
import { useState } from "react";

export default function BeforeAfterNextYearCyclePrice() {
  const [daySelection, setDaySelection] = useState('up-to-3-days-a-week');

  return (
    <div className="space-y-4 pt-4">
      <div className="flex md:flex-row flex-col items-start md:items-center gap-2">
        <div className="flex-1">
          <h1 className="font-medium text-[24px] text-black">Update Price for Next Year Cycle</h1>
        </div>
        <div className="flex-none">
          <div className="relative">
            <Listbox value={daySelection} onChange={(value: string) => { setDaySelection(value); }}>
              <Listbox.Button
                as="div"
                className="bg-primary rounded text-white flex items-center w-full justify-between">
                {
                  ({ open }) => {
                    return (
                      <>
                        <div className="px-3 py-2">{capitalCase(noCase(daySelection))}</div>
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
                  className="absolute top-[105%] sm:right-0 right-auto w-[256px] bg-white rounded drop-shadow overflow-hidden">
                  {
                    ['up-to-3-days-a-week', '4-to-5-days-a-week'].map((value: any, index: any) => (
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
      <div className="block overflow-auto">
        <table className="min-w-[1024px] w-full">
          <thead>
            <tr className="[&>th]:font-medium [&>th]:text-black [&>th]:px-2 [&>th]:py-3 [&>th]:bg-secondary-light">
              <th className="w-48">Name</th>
              <th>Before Care</th>
              <th>After Care</th>
              <th>Both</th>
            </tr>
          </thead>
          <tbody>
            {
              [1, 2, 3].map((childValue) => {
                return (
                  <tr key={`before-after-next-year-cycle-${childValue}`}
                    className="[&>td]:font-medium [&>td]:text-black [&>td]:text-center [&>td]:px-2 [&>td]:py-3 [&>td]:bg-secondary">
                    <td className="w-48">Children #{childValue}</td>
                    <td className="capitalize">
                      <span className={`block w-full border border-secondary-light p-3 bg-white rounded text-center`}
                        onClick={() => { }}>
                        {
                          Intl.NumberFormat('en-US', {
                            style: "currency",
                            currency: 'USD',
                          }).format(12.00)
                        }
                      </span>
                    </td>
                    <td className="capitalize">
                      <span className={`block w-full border border-secondary-light p-3 bg-white rounded text-center`}
                        onClick={() => { }}>
                        {
                          Intl.NumberFormat('en-US', {
                            style: "currency",
                            currency: 'USD',
                          }).format(12.00)
                        }
                      </span>
                    </td>
                    <td className="capitalize">
                      <span className={`block w-full border border-secondary-light p-3 bg-white rounded text-center`}
                        onClick={() => { }}>
                        {
                          Intl.NumberFormat('en-US', {
                            style: "currency",
                            currency: 'USD',
                          }).format(12.00)
                        }
                      </span>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}