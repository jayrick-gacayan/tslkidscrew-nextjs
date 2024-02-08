import { Fa6SolidChevronLeft } from "@/app/_components/svg/fa6-solid-chevron-left";
import { Fa6SolidChevronRight } from "@/app/_components/svg/fa6-solid-chevron-right";
import { getYear } from "date-fns";
import ButtonDPNavHeader from "./button-dp-nav-header";

export function renderCustomHeaderYearOnly({
  date,
  decreaseYear,
  increaseYear,
  nextYearButtonDisabled,
  prevYearButtonDisabled,
}: {
  date: Date;
  decreaseYear(): void;
  increaseYear(): void;
  prevYearButtonDisabled: boolean;
  nextYearButtonDisabled: boolean;
}) {
  return (
    <div className="flex w-full items-center gap-4 bg-primary text-white">
      <ButtonDPNavHeader disabled={prevYearButtonDisabled} direction="left" onClick={decreaseYear} />
      <div className="flex-1 p-3 text-center">{getYear(date)}</div>
      <ButtonDPNavHeader disabled={nextYearButtonDisabled} direction="right" onClick={increaseYear} />
    </div>
  )
}