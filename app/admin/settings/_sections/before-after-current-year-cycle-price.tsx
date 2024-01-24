'use client';

import { Listbox, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { capitalCase, noCase } from "change-case";
import { useState } from "react";

export default function BeforeAfterCurrentYearCyclePrice() {
  const [daySelection, setDaySelection] = useState('everyday');

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="flex-1">
          <h1 className="font-medium text-[24px] text-black">Update Price for Current Year Cycle</h1>
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
                    ['everyday', 'three-days-per-week', 'one-or-two-days-per-week'].map((value: any, index: any) => (
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
        <table className="min-w-[768px] w-full">
          <thead>
            <tr className="[&>th]:font-medium [&>th]:text-black [&>th]:px-2 [&>th]:py-3 [&>th]:bg-secondary-light">
              <th>Name</th>
              <th>Before Care</th>
              <th>After Care</th>
              <th>Both</th>
            </tr>
          </thead>
          <tbody>
            {
              [1, 2, 3].map((childValue) => {
                return (
                  <tr className="[&>td]:font-medium [&>td]:text-black [&>td]:text-center [&>td]:px-2 [&>td]:py-3 [&>td]:bg-secondary">
                    <td>Children #{childValue}</td>
                    <td className="capitalize">
                      <input className="rounded w-full outline-0 outline-transparent bg-white p-2" />
                    </td>
                    <td className="capitalize">
                      <input className="rounded w-full outline-0 outline-transparent bg-white p-2" />
                    </td>
                    <td className="capitalize">
                      <input className="rounded w-full outline-0 outline-transparent bg-white p-2" />
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