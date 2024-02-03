import CustomCheckbox from "@/app/_components/custom-checkbox";
import CustomInput from "@/app/_components/custom-input";
import CustomTextarea from "@/app/_components/custom-textarea";
import { Fa6SolidChevronDown } from "@/app/_components/svg/fa6-solid-chevron-down";
import { ValidationType } from "@/types/enums/validation-type";
import { Listbox, Popover, Transition } from "@headlessui/react";
import { capitalCase, noCase } from "change-case";
import { format } from "date-fns";
import { Fragment, useState } from "react";
import { DayPicker } from "react-day-picker";

export default function SummerCampWeekPrices() {
  const [reactDayPicker, setReactDayPicker] = useState<Date | undefined>();
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
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button as={Fragment}>
                    <input type='text' className="p-3 bg-white w-full outline-0 outline-transparent"
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