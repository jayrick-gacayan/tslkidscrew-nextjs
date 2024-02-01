'use client';

import CustomInput from "@/app/_components/custom-input";
import { ValidationType } from "@/types/enums/validation-type";
import { Popover, Transition } from "@headlessui/react";
import { format } from "date-fns";
import { Fragment, useState } from "react";
import { DayPicker } from "react-day-picker";
let today = new Date();
let defaultDate = new Date(new Date(today.getFullYear() - 5, today.getMonth(), today.getDate()))

export default function ChildrenForm() {
  const [reactDayPicker, setReactDayPicker] = useState<Date | undefined>(defaultDate);

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-black">
        <h1 className="font-medium text-[36px]">Child&#47;ren&#39;s Information</h1>
        <p>Accepting children 5 years old and up at this location.</p>
      </div>
      <div className="w-full rounded border border-secondary-light p-4 space-y-4">
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
                      <DayPicker mode="single"
                        toDate={defaultDate}
                        selected={reactDayPicker}
                        onSelect={setReactDayPicker}
                        className="rounded shadow-lg border border-secondary bg-white"
                        classNames={{
                          caption: "flex justify-center py-2 mb-4 relative items-center",
                          caption_label: "text-sm font-medium",
                          nav: "flex items-center",
                          nav_button:
                            "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                          nav_button_previous: "absolute left-1.5",
                          nav_button_next: "absolute right-1.5",
                          table: "w-full border-collapse",
                          head_row: "flex font-medium",
                          head_cell: "m-0.5 w-9 font-medium text-sm",
                          row: "flex w-full mt-2",
                          cell: "text-secondary-light rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-primary/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-primary/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                          day: "h-9 w-9 p-0 hover:rounded hover:bg-secondary hover:text-primary",
                          day_selected:
                            "rounded-md bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white",
                          // day_today: "rounded-md bg-gray-200 text-primary",
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
    </div>
  )
}