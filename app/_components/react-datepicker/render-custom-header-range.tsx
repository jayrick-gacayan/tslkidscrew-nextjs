import { format } from "date-fns";
import { Fa6SolidChevronLeft } from "../svg/fa6-solid-chevron-left";
import { Fa6SolidChevronRight } from "../svg/fa6-solid-chevron-right";

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
    <div className="flex w-full items-center gap-4 bg-primary text-white">
      <button type="button"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        className={`${customHeaderCount === 1 ? 'invisible' : 'visible'} cursor-pointer p-3`}>
        <Fa6SolidChevronLeft className="inline-block text-[24px] font-medium" />
      </button>
      <div className={`flex-1 ${customHeaderCount === 0 ? 'sm:text-left text-center' : 'sm:text-right text-center'}`}>
        {format(new Date(monthDate), 'MMMM yyyy')}
      </div>
      <button type="button"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        className={`${customHeaderCount === 0 ? 'invisible' : 'visible'} cursor-pointer p-3`}>
        <Fa6SolidChevronRight className="inline-block text-[24px] font-medium" />
      </button>
    </div>
  )
}