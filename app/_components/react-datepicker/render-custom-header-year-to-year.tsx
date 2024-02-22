import { addYears, getYear } from "date-fns";

export function renderCustomHeaderYearToYear({ date }: { date: Date; }) {
  return (
    <div className="block w-full items-center gap-4 text-primary border-b-2 border-b-primary">
      <div className="p-3 text-center">{getYear(date)}-{getYear(addYears(date, 1))}</div>
    </div>
  )
}