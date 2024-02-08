import CustomCheckbox from "@/app/_components/custom-checkbox";
import CustomInput from "@/app/_components/custom-input";
import CustomTextarea from "@/app/_components/custom-textarea";
import calendarContainer from "@/app/_components/react-datepicker/calendar-container";
import CustomInputDefault from "@/app/_components/react-datepicker/custom-input-default";
import { Fa6SolidChevronDown } from "@/app/_components/svg/fa6-solid-chevron-down";
import { Fa6SolidChevronLeft } from "@/app/_components/svg/fa6-solid-chevron-left";
import { Fa6SolidChevronRight } from "@/app/_components/svg/fa6-solid-chevron-right";
import { ValidationType } from "@/types/enums/validation-type";
import { Listbox, Transition } from "@headlessui/react";
import { capitalCase, noCase } from "change-case";
import { addYears, format } from "date-fns";
import { useState } from "react";
import DatePicker from "react-datepicker";

let today = new Date();
const maxDate = addYears(today, 1);

export default function SummerCampWeekPrices() {
  const [weekDate, setWeekDate] = useState<Date | null>(today);
  const [week, setWeek] = useState('week-1');

  return (
    <div className="space-y-4">
      <div className="flex sm:flex-row flex-col items-start gap-2 sm:items-center w-full">
        <div className="flex-1">
          <h1 className="font-medium text-[24px] text-black">Update Weeks</h1>
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
        <div className="w-full md:w-8/12 block space-y-4">
          <CustomInput labelText='Name'
            fieldInput={{ value: '', errorText: '', validationStatus: ValidationType.NONE }}
            type='text'
            onChange={(value: string) => { return; }}
            className="bg-white" />
          <div className="space-y-1 w-full">
            <div className="font-medium">Start Date</div>
            <div>
              <DatePicker selected={weekDate}
                customInput={<CustomInputDefault className='bg-white' />}
                onChange={(date) => { setWeekDate(date) }}
                calendarContainer={calendarContainer}
                renderCustomHeader={({
                  changeYear,
                  date,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled
                }) => {
                  return (
                    <div className="flex w-full items-center gap-4 bg-primary text-white">
                      <button type="button"
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                        className={`cursor-pointer p-3`}>
                        <Fa6SolidChevronLeft className="inline-block text-[24px] font-medium" />
                      </button>
                      <div className={`flex-1 text-center`}>
                        {format(new Date(date), 'MMMM d')}
                      </div>
                      <button type="button"
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                        className={`cursor-pointer p-3`}>
                        <Fa6SolidChevronRight className="inline-block text-[24px] font-medium" />
                      </button>
                    </div>
                  )
                }}
              />
            </div>

          </div>
          <CustomInput labelText='Capacity'
            fieldInput={{ value: '', errorText: '', validationStatus: ValidationType.NONE }}
            type='text'
            inputMode="numeric"
            onChange={(value: string) => { return; }}
            className="bg-white" />
          <CustomTextarea labelText='Notes'
            fieldInput={{ value: '', errorText: '', validationStatus: ValidationType.NONE }}
            onChange={(value: string) => { return }}
            className="bg-white"
            rows={7} />
        </div>
      </div>
    </div>
  )
}