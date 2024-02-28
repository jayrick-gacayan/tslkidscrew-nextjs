'use client';

import CustomCheckbox from "@/app/_components/custom-checkbox";
import InputCustom from "@/app/_components/input-custom";
import { Fa6SolidChevronDown } from "@/app/_components/svg/fa6-solid-chevron-down";
import { SummerCampPromoSetting } from "@/models/summer-camp-promo-setting";
import { Listbox, Transition } from "@headlessui/react";
import { capitalCase, noCase } from "change-case";
import { SetStateAction, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import SummerCampPromoPricesForm from "./summer-camp-promo-prices-form";

export default function SummerCampPromos({
  summerCampPromoSettings
}: {
  summerCampPromoSettings: SummerCampPromoSetting[];
}) {
  const [weekStr, setWeekStr] = useState('week-6');

  const weekDataMemo = useMemo(() => {
    let weekNumberSplit = weekStr.split('-')[1];
    let weekNumber = parseInt(weekNumberSplit) ?? 1;

    return summerCampPromoSettings.filter((value: SummerCampPromoSetting) => {
      return value.week_count === weekNumber
    });
  }, [
    weekStr,
    summerCampPromoSettings
  ]);

  return (
    <div className="space-y-4 pt-4">
      <SummerCampPromoPricesForm weekStr={weekStr}
        setWeekStr={setWeekStr}
        summerCampPromoData={weekDataMemo!} />
    </div>
  )
}