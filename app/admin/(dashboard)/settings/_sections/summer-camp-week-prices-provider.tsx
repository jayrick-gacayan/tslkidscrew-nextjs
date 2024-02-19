import { useAppSelector } from "@/hooks/redux-hooks";
import { SummerCampWeekSetting } from "@/models/summer-camp-week-setting";
import { RootState, reduxStore } from "@/react-redux/redux-store";
import { ReactNode, useEffect, useMemo } from "react";
import { AdminSettingsState } from "../_redux/admin-settings-state";
import { summerCampWeekSettingFilled } from "../_redux/admin-settings-slice";

export default function SummerCampWeekPricesProvider({
  summerCampWeekSettings,
  children,
}: {
  summerCampWeekSettings: SummerCampWeekSetting[],
  children: ReactNode;
}) {
  const adminSettingsState: AdminSettingsState = useAppSelector((state: RootState) => { return state.adminSettings });

  const week = useMemo(() => {
    let weekNumber = adminSettingsState.summerCampWeekSetting.week.split('-')[1];
    return parseInt(weekNumber) ?? 1;
  }, [adminSettingsState.summerCampWeekSetting.week]);

  useEffect(() => {
    let summerCampWeekSettingData = summerCampWeekSettings.find(
      (value: SummerCampWeekSetting) => {
        return value.week_number === week;
      }
    );

    if (summerCampWeekSettingData) {
      reduxStore.dispatch(summerCampWeekSettingFilled({
        name: summerCampWeekSettingData.name ?? '',
        capacity: summerCampWeekSettingData.capacity ?? undefined,
        notes: summerCampWeekSettingData.notes ?? '',
        start_date: summerCampWeekSettingData.start_date,
        enabled: summerCampWeekSettingData.enabled ?? false,
      }))
    }

  }, [week])

  return (<>{children}</>);

}