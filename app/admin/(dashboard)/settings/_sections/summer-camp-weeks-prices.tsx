import { Fa6SolidChevronDown } from "@/app/_components/svg/fa6-solid-chevron-down";
import { Listbox, Transition } from "@headlessui/react";
import { capitalCase, noCase } from "change-case";
import { useMemo, useState } from "react";
import { SummerCampWeekSetting } from "@/models/summer-camp-week-setting";
import InputCheckboxCustom from "@/app/_components/input-checkbox-custom";
import SummerCampWeekSettingForm from "./summer-camp-week-setting-form";

export default function SummerCampWeekPrices({
  summerCampWeekSettings
}: {
  summerCampWeekSettings: SummerCampWeekSetting[];
}) {
  const [weekStr, setWeekStr] = useState('week-1');

  const weekDataMemo = useMemo(() => {
    let weekNumberSplit = weekStr.split('-')[1];
    let weekNumber = parseInt(weekNumberSplit) ?? 1;

    return summerCampWeekSettings.find((value: SummerCampWeekSetting) => {
      return value.week_number === weekNumber
    });
  }, [
    weekStr,
    summerCampWeekSettings
  ])

  return (
    <div className="space-y-4 pt-4">
      <SummerCampWeekSettingForm weekData={weekDataMemo!}
        weekStr={weekStr}
        setWeekStr={setWeekStr} />
    </div>
  )
}