import { format } from "date-fns";
import ButtonDPNavHeader from "./button-dp-nav-header";

export default function renderCustomHeaderRange({
  monthDate,
  customHeaderCount,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled
}: {
  monthDate: Date;
  customHeaderCount: number;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
}) {
  return (
    <div className="flex w-full items-center gap-4 text-primary border-b-2 border-b-primary">
      <ButtonDPNavHeader disabled={prevMonthButtonDisabled}
        direction="left"
        conditionCustomHeaderCount={customHeaderCount === 0}
        onClick={decreaseMonth} />
      <div className={`flex-1 ${customHeaderCount === 0 ? 'sm:text-left text-center' : 'sm:text-right text-center'}`}>
        {format(new Date(monthDate), 'MMMM yyyy')}
      </div>
      <ButtonDPNavHeader disabled={nextMonthButtonDisabled}
        direction="right"
        conditionCustomHeaderCount={customHeaderCount === 1}
        onClick={increaseMonth} />
    </div>
  )
}