import { useMemo, useState } from "react";
import { SummerCampWeekSetting } from "@/models/summer-camp-week-setting";
import SummerCampWeekSettingForm from "./summer-camp-week-setting-form";
import InputCheckboxCustom from "@/app/_components/input-checkbox-custom";
import SettingListboxCustom from "../_components/setting-custom-lisbox";

export default function SummerCampWeekPrices({
  summerCampWeekSettings,
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
      <div className="flex sm:flex-row flex-col items-start gap-2 sm:items-center w-full">
        <div className="flex-1">
          <h1 className="font-medium text-[24px] text-black">Update Weeks</h1>
        </div>
        <div className="flex-none sm:w-auto w-full">
          <div className="flex w-full sm:w-72 items-center gap-2">
            <div className="w-full">
              <InputCheckboxCustom labelText="Enabled"
                id={`${weekStr}-summer-camp-week-setting`}
                name="week-enabled"
                defaultChecked={weekDataMemo?.enabled ?? false}
                form="summer-camp-week-setting-form" />
            </div>
            <SettingListboxCustom listboxData={weekStr}
              onChangeListbox={(value: any) => { setWeekStr(value) }}
              items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((numVal) => { return 'week-' + numVal; })}
              keyDescription='show-week-rates-summer-camps' />
          </div>
        </div>
      </div>
      <SummerCampWeekSettingForm weekData={weekDataMemo} />
    </div>
  )
}