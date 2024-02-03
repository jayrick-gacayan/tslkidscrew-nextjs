'use client';

import CustomCheckbox from "@/app/_components/custom-checkbox";
import { Popover, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";

export default function RegistrationTypeSelectionBeforeOrAfterSchool() {
  const [reactDayPicker, setReactDayPicker] = useState<Date>();

  return (
    <div className="space-y-8">
      <h1 className="font-medium text-[36px]">Registration Type Selection</h1>

      <div className="space-y-6">
        <div className="relative space-y-1">
          <div className="font-medium">Start Date</div>
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button as={Fragment}>
                  <input type='text' className="p-3 bg-secondary w-full outline-0 outline-transparent"
                    onChange={() => { return }}
                    placeholder="Choose a Date"
                    readOnly
                    value={reactDayPicker ? format(reactDayPicker, 'LL-dd-yyyy') : ''} />
                </Popover.Button>
                <Transition as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1">
                  <Popover.Panel className='absolute z-[999] top-[115%]'>
                    <DayPicker
                      mode="single"
                      selected={reactDayPicker}
                      onSelect={setReactDayPicker}
                      className="rounded shadow-lg border border-secondary bg-white"
                      classNames={{
                        caption: "flex justify-center py-2 mb-4 relative items-center",
                        caption_label: "text-sm font-medium text-gray-900",
                        nav: "flex items-center",
                        nav_button:
                          "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                        nav_button_previous: "absolute left-1.5",
                        nav_button_next: "absolute right-1.5",
                        table: "w-full border-collapse",
                        head_row: "flex font-medium",
                        head_cell: "m-0.5 w-9 font-medium text-sm",
                        row: "flex w-full mt-2",
                        cell: "text-secondary-light rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                        day: "h-9 w-9 p-0",
                        day_range_end: "day-range-end",
                        day_selected:
                          "rounded-md bg-primary text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                        day_today: "rounded-md bg-gray-200 text-gray-900",
                        day_outside:
                          "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                        day_disabled: "text-gray-500 opacity-50",
                        day_hidden: "invisible",
                      }}
                    // components={{
                    //   IconLeft: ({ ...props }) => (
                    //     <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                    //   ),
                    //   IconRight: ({ ...props }) => (
                    //     <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                    //   ),
                    // }}
                    />
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
        <div className="space-y-6">
          <div className='block space-y-2'>
            <h4 className="font-medium">Before School:</h4>
            <div className="flex lg:flex-row flex-col items-start lg:items-center gap-4">
              <CustomCheckbox value={false} text='Monday' />
              <CustomCheckbox value={false} text='Tuesday' />
              <CustomCheckbox value={false} text='Wednesday' />
              <CustomCheckbox value={false} text='Thursday' />
              <CustomCheckbox value={false} text='Friday' />
            </div>
          </div>
          <div className='block space-y-2'>
            <h4 className="font-medium">After School:</h4>
            <div className="flex lg:flex-row flex-col items-start lg:items-center gap-4">
              <CustomCheckbox value={false} text='Monday' />
              <CustomCheckbox value={false} text='Tuesday' />
              <CustomCheckbox value={false} text='Wednesday' />
              <CustomCheckbox value={false} text='Thursday' />
              <CustomCheckbox value={false} text='Friday' />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}