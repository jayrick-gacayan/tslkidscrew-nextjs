import calendarContainer from "@/app/_components/react-datepicker/calendar-container";
import DatepickerYearToYearInputCustom from "@/app/_components/react-datepicker/datepicker-year-to-year-input-custom";
import { renderCustomHeaderYearToYear } from "@/app/_components/react-datepicker/render-custom-header-year-to-year";
import { renderYearContent } from "@/app/_components/react-datepicker/render-year-content";
import { addYears, format, subYears } from "date-fns";
import { useState } from "react";
import DatePicker from "react-datepicker";

let today = new Date();
let minDate = subYears(today, 1);
let maxDate = addYears(today, 1);

export default function UpdateYearCycle() {
  const [currentYearCycle, setCurrentYearCycle] = useState<Date | null>(minDate);
  const [nextYearCycle, setNextYearCycle] = useState<Date | null>(today);

  return (
    <div className="space-y-4">
      <h1 className="font-medium text-[24px] text-black">Update Year Cycle</h1>
      <div className="rounded bg-secondary p-4">
        <div className="space-y-4 w-[576px]">
          <div className="flex items-center w-full gap-4">
            <div className="w-full">
              <h6 className="font-medium">Current year</h6>
            </div>
            <div className="w-full block relative">
              <DatePicker selected={currentYearCycle}
                customInput={<DatepickerYearToYearInputCustom />}
                onChange={(date) => { setCurrentYearCycle(date) }}
                minDate={minDate}
                maxDate={maxDate}
                popperClassName="z-50"
                calendarContainer={calendarContainer}
                renderCustomHeader={renderCustomHeaderYearToYear}
                renderYearContent={renderYearContent}
                showYearPicker
              />
            </div>
          </div>
          <div className="flex items-center w-full gap-4">
            <div className="w-full">
              <h6 className="font-medium">Next Year</h6>
            </div>
            <div className="w-full block relative">
              <DatePicker selected={nextYearCycle}
                customInput={<DatepickerYearToYearInputCustom />}
                onChange={(date) => { setNextYearCycle(date) }}
                minDate={minDate}
                maxDate={maxDate}
                popperClassName="z-50"
                calendarContainer={calendarContainer}
                renderCustomHeader={renderCustomHeaderYearToYear}
                renderYearContent={renderYearContent}
                showYearPicker
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}