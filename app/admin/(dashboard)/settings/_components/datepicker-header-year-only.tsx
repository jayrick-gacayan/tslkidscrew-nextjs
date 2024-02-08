import { Fa6SolidChevronLeft } from "@/app/_components/svg/fa6-solid-chevron-left";
import { Fa6SolidChevronRight } from "@/app/_components/svg/fa6-solid-chevron-right";
import { getYear } from "date-fns";

export function datePickerHeaderYearOnly({
  date,
  decreaseYear,
  increaseYear,
  nextYearButtonDisabled,
  prevYearButtonDisabled
}: {
  date: Date;
  decreaseYear(): void;
  increaseYear(): void;
  prevYearButtonDisabled: boolean;
  nextYearButtonDisabled: boolean;
}) {

  return (
    <div className="flex items-center gap-4 bg-primary text-white">
      <button type="button"
        onClick={increaseYear}
        className='p-3'
        disabled={prevYearButtonDisabled}>
        <Fa6SolidChevronLeft className="inline-block text-[24px] font-medium" />
      </button>
      <div className="flex-1 p-3">{getYear(date)}</div>
      <button type="button"
        onClick={decreaseYear}
        className='p-3'
        disabled={nextYearButtonDisabled}>
        <Fa6SolidChevronRight className="inline-block text-[24px] font-medium" />
      </button>
    </div>
  )
}