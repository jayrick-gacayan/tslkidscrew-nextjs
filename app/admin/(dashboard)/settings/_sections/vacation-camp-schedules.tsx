'use client';

import { renderCustomHeaderYearOnly } from "@/app/_components/react-datepicker/render-custom-header-year-only";
import { renderMonthContent } from "@/app/_components/react-datepicker/render-month-content";
import DatepickerMonthYearInputCustom from '@/app/_components/react-datepicker/datepicker-month-year-custom-input';
import { Fa6SolidChevronDown } from "@/app/_components/svg/fa6-solid-chevron-down";
import { Listbox, Transition } from "@headlessui/react";
import { capitalCase, noCase } from "change-case";
import { addYears } from "date-fns";
import { useState } from "react";
import DatePicker from "react-datepicker";
import DatepickerCustomInput from "@/app/_components/react-datepicker/datepicker-custom-input-range";
import calendarContainerRange from "@/app/_components/react-datepicker/calendar-container-range";
import renderDayContents from "@/app/_components/react-datepicker/render-day-contents";
import renderCustomHeaderRange from "@/app/_components/react-datepicker/render-custom-header-range";
import calendarContainer from "@/app/_components/react-datepicker/calendar-container";
import InputCustom from "@/app/_components/input-custom";
import { useFormStatus } from "react-dom";

const today = new Date();
const maxDate = addYears(today, 1);

export default function VacationCampSchedules() {
  const { pending } = useFormStatus();
  const [camp, setCamp] = useState('camp-1');
  const [monthYearDate, setMonthYearDate] = useState<Date | null>(today);
  const [rangeDate, setRangeDate] = useState<[Date | null, Date | null]>([today, today]);

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
              <InputCustom
                id='schedule-name'
                name='schedule-name'
                type="text"
                className="bg-white p-2 px-3"
                placeholder="Name:" />
            </div>
          </div>
          <div className="flex sm:flex-row flex-col items-start sm:items-center gap-2">
            <div className="basis-full sm:basis-5/12">
              <p className="font-semibold text-black">Capacity</p>
            </div>
            <div className="w-full sm:flex-1">
              <InputCustom
                id='schedule-capacity'
                name='schedule-capacity'
                type="text"
                className="bg-white p-2 px-3"
                placeholder="Capacity:" />
            </div>
          </div>
          <div className="flex sm:flex-row flex-col items-start sm:items-center gap-2">
            <div className="basis-full sm:basis-5/12">
              <p className="font-semibold text-black">Month and Year</p>
            </div>
            <div className="w-full sm:flex-1">
              <DatePicker selected={monthYearDate}
                customInput={<DatepickerMonthYearInputCustom />}
                onChange={(date) => { setMonthYearDate(date) }}
                maxDate={maxDate}
                popperClassName="z-50"
                calendarContainer={calendarContainer}
                renderCustomHeader={renderCustomHeaderYearOnly}
                renderMonthContent={renderMonthContent}
                formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 3)}
                showMonthYearPicker />
            </div>
          </div>
          <div className="flex lg:flex-row flex-col items-start lg:items-center gap-2">
            <div className="basis-full lg:basis-5/12">
              <p className="font-semibold text-black">Date</p>
            </div>
            <div className="w-full lg:flex-1 relative">
              <DatePicker selected={rangeDate[0]}
                selectsRange
                monthsShown={2}
                customInput={<DatepickerCustomInput />}
                onChange={(date) => { setRangeDate(date) }}
                startDate={rangeDate[0]}
                endDate={rangeDate[1]}
                calendarContainer={calendarContainerRange}
                showPreviousMonths
                formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 3)}
                renderDayContents={renderDayContents}
                renderCustomHeader={renderCustomHeaderRange} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-fit ml-auto block">
        <button className="bg-primary text-white p-2 rounded disabled:cursor-not-allowed"
          disabled={pending}>
          {pending ? '...Processing' : 'Update Schedule'}
        </button>
      </div>
    </div>
  )
}