import calendarContainer from "@/app/_components/react-datepicker/calendar-container";
import DatepickerYearToYearInputCustom from "@/app/_components/react-datepicker/datepicker-year-to-year-input-custom";
import { renderCustomHeaderYearToYear } from "@/app/_components/react-datepicker/render-custom-header-year-to-year";
import { renderYearContent } from "@/app/_components/react-datepicker/render-year-content";
import { format } from "date-fns";
import { ReactNode, Dispatch, SetStateAction } from "react";
import DatePicker from "react-datepicker";

export default function YearToYearDatePicker({
  name,
  headerText,
  selected,
  setYearCycle,
  minDate,
  maxDate,
}: {
  headerText: string | ReactNode;
  name: string;
  selected: Date | null;
  setYearCycle: Dispatch<SetStateAction<Date | null>>;
  minDate: Date;
  maxDate: Date;
}) {
  return (
    <div className="flex items-center w-full gap-4">
      <div className="w-full">
        <h6 className="font-medium">{headerText}</h6>
      </div>
      <div className="w-full block relative">
        <DatePicker selected={selected}
          name={name}
          value={!!selected ? format(new Date(selected), `yyyy`) : ''}
          customInput={<DatepickerYearToYearInputCustom />}
          onChange={(date) => { setYearCycle(date) }}
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
  )
}