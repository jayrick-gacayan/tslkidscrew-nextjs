import CustomCheckbox from "@/app/_components/custom-checkbox";
import InputCustom from "@/app/_components/input-custom";
import calendarContainer from "@/app/_components/react-datepicker/calendar-container";
import CustomInputDefault from "@/app/_components/react-datepicker/custom-input-default";
import renderCustomHeaderDefault from "@/app/_components/react-datepicker/render-custom-header-default";
import { Fa6SolidChevronDown } from "@/app/_components/svg/fa6-solid-chevron-down";
import TextareaCustom from "@/app/_components/textarea-custom";
import { Listbox, Transition } from "@headlessui/react";
import { capitalCase, noCase } from "change-case";
import { useState } from "react";
import DatePicker from "react-datepicker";

let today = new Date();

export default function SummerCampWeekPrices() {
  const [weekDate, setWeekDate] = useState<Date | null>(today);
  const [week, setWeek] = useState('week-1');

  return (
    <div className="space-y-4 pt-4">
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
          <InputCustom labelText="Name"
            id='week-name'
            name='week-name'
            type="text"
            className="bg-white p-2 px-3"
            placeholder="Week Name:" />
          <div className="space-y-1 w-full">
            <div className="font-medium">Start Date</div>
            <DatePicker selected={weekDate}
              customInput={<CustomInputDefault className='bg-white' />}
              onChange={(date) => { setWeekDate(date) }}
              calendarContainer={calendarContainer}
              renderCustomHeader={renderCustomHeaderDefault}
              formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 3)} />
          </div>
          <InputCustom labelText="Capacity"
            id='week-capacity'
            name='week-capacity'
            type="text"
            className="bg-white p-2 px-3"
            placeholder="Capacity:" />
          <TextareaCustom labelText="Notes"
            id='week-name-notes'
            name='notes'
            className="bg-white"
            placeholder='Enter your note/s here:'
            rows={7} />
        </div>
      </div>
    </div>
  )
}