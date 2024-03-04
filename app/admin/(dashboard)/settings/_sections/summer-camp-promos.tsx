'use client';

import { SummerCampPromoSetting } from "@/models/summer-camp-promo-setting";
import { useMemo, useState } from "react";
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

  const weekNumbers: number[] = useMemo(() => {
    return summerCampPromoSettings.filter((val: SummerCampPromoSetting, index: number, current: SummerCampPromoSetting[]) => {
      let tempArr = current.map((val: SummerCampPromoSetting) => { return val.week_count });

      return tempArr.indexOf(val.week_count) === index;
    }).filter((value: SummerCampPromoSetting) => { return value.week_count !== 0; })
      .map((val: SummerCampPromoSetting) => { return val.week_count!; })
  }, [summerCampPromoSettings])

  return (
    <div className="space-y-4 pt-4">
      <SummerCampPromoPricesForm weekStr={weekStr}
        setWeekStr={setWeekStr}
        summerCampPromoData={weekDataMemo!}
        weekNumbers={weekNumbers} />
    </div>
  )
}