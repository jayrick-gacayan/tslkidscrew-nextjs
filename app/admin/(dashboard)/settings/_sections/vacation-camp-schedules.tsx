'use client';

import CustomInput from "@/app/_components/custom-input";
import { Fa6SolidChevronDown } from "@/app/_components/svg/fa6-solid-chevron-down";
import { Fa6SolidChevronLeft } from "@/app/_components/svg/fa6-solid-chevron-left";
import { Fa6SolidChevronRight } from "@/app/_components/svg/fa6-solid-chevron-right";
import { ValidationType } from "@/types/enums/validation-type";
import { Listbox, Popover, Transition } from "@headlessui/react";
import { capitalCase, noCase } from "change-case";
import { format, getYear } from "date-fns";
import { Fragment, useCallback, useState } from "react";
import DatePicker from "react-datepicker";
import { datePickerHeaderYearOnly } from "../_components/datepicker-header-year-only";
import CustomDatePickerInput from "../_components/react-datepicker-custom-input";
import { renderMonthContent } from "../_components/render-month-content";


function dateDf(d: Date, df?: string) {
  return format(d, df ?? 'LL-dd-yyyy');
}

export default function VacationCampSchedules() {
  const [camp, setCamp] = useState('camp-1');
  const [monthYearDate, setMonthYearDate] = useState<Date | null>(new Date());
  // const [reactDayPicker, setReactDayPicker] = useState<DateRange | undefined>();

  // const reactDaypickerCB = useCallback(() => {
  //   if (!reactDayPicker || (!reactDayPicker.from || !reactDayPicker.to)) { return ''; }

  //   return `${dateDf(reactDayPicker.from)} to ${dateDf(reactDayPicker.to)}`
  // }, [reactDayPicker])

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
        <div className="w-full xxl:w-5/12 block space-y-4">
          <div className="flex sm:flex-row flex-col items-start sm:items-center gap-2 w-full">
            <div className="basis-full sm:basis-5/12">
              <p className="font-semibold text-black">Name</p>
            </div>
            <div className="w-full sm:flex-1">
              <CustomInput fieldInput={{ value: '', errorText: '', validationStatus: ValidationType.NONE }}
                type='text'
                onChange={(value: string) => { return; }}
                className="bg-white" />
            </div>
          </div>
          <div className="flex sm:flex-row flex-col items-start sm:items-center gap-2">
            <div className="basis-full sm:basis-5/12">
              <p className="font-semibold text-black">Capacity</p>
            </div>
            <div className="w-full sm:flex-1">
              <CustomInput fieldInput={{ value: '', errorText: '', validationStatus: ValidationType.NONE }}
                type='text'
                inputMode="numeric"
                onChange={(value: string) => { return; }}
                className="bg-white" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="basis-full sm:basis-5/12">
              <p className="font-semibold text-black">Month And Year</p>
            </div>
            <div className="flex-1">
              <DatePicker selected={monthYearDate}
                customInput={<CustomDatePickerInput />}
                onChange={(date) => { setMonthYearDate(date) }}
                calendarContainer={
                  ({ children, className, arrowProps, showPopperArrow }) => {
                    return (
                      <div className="bg-white rounded border border-secondary-light shadow-lg">
                        {children}
                      </div>
                    )
                  }
                }
                renderCustomHeader={datePickerHeaderYearOnly}
                renderMonthContent={renderMonthContent}
                showMonthYearPicker
                dateFormat="MMMM/yyyy"
              />
            </div>
          </div>
          {/* <div className="flex md:flex-row flex-col items-start md:items-center gap-2">
            <div className="basis-full md:basis-5/12">
              <p className="font-semibold text-black">Date</p>
            </div>
            <div className="w-full md:flex-1">
              <div className="w-full">
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button as={Fragment}>
                        <input type='text' className="p-3 bg-white w-full outline-0 outline-transparent"
                          onChange={() => { return }}
                          placeholder="Choose a Date Range"
                          readOnly
                          value={reactDaypickerCB()} />
                      </Popover.Button>
                      <Transition as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1">
                        <Popover.Panel className='absolute z-[999] top-[115%]' >

                          <DayPicker
                            mode="range"
                            numberOfMonths={2}
                            selected={reactDayPicker}
                            onSelect={setReactDayPicker}
                            className="rounded shadow-lg border border-secondary bg-white"
                            classNames={{
                              months: 'flex items-stretch p-4 gap-4',
                              month: 'w-full',
                              caption: "flex justify-center py-2 mb-4 items-center",
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
                            }} />

                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </div>

            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}