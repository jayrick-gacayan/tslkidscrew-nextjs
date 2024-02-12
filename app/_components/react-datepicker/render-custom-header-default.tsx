import { format } from "date-fns";
import ButtonDPNavHeader from "./button-dp-nav-header";

export default function renderCustomHeaderDefault({
  changeYear,
  changeMonth,
  decreaseYear,
  increaseYear,
  monthDate,
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled
}: {
  changeYear: (year: number) => void;
  changeMonth: (month: number) => void;
  decreaseYear: () => void;
  increaseYear: () => void;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  monthDate: Date;
  date: Date;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
}) {
  return (
    <div className="flex w-full items-center gap-4 text-primary border-b-2 border-b-primary">
      <ButtonDPNavHeader disabled={prevMonthButtonDisabled} direction="left" onClick={decreaseMonth} />
      <div className={`flex-1 text-center`}>
        {format(new Date(date), 'MMMM d')}
      </div>
      <ButtonDPNavHeader disabled={nextMonthButtonDisabled} direction="right" onClick={increaseMonth} />
    </div>
  )
}
