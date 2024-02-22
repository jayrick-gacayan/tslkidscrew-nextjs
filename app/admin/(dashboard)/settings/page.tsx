import { auth } from "@/auth";
import AdminHeaderWithEntries from "../_components/admin-header-with-entries";
import TabsContainer from "./_sections/tabs-container";
import { Admin } from "@/models/admin";
import { Session } from "next-auth";
import {
  getProgramYearCycleSettings,
  getSummerCampPromoSettings,
  getSummerCampSwimPrices,
  getSummerCampWeekPrices,
  getVacationCampSchedulesSettings
} from "@/services/program-settings-services";
import { Result } from "@/models/result";
import { SummerCampWeekSetting } from "@/models/summer-camp-week-setting";
import { SummerCampSwimSetting } from "@/models/summer-camp-swim-setting";
import { ProgramYearCycleSetting } from "@/models/program-year-cycle-setting";

export default async function Page() {
  let currentAdmin: Session<Admin> | null = await auth();

  let summerCampWeekSettings: Result<SummerCampWeekSetting[]> = await getSummerCampWeekPrices(currentAdmin?.accessToken!);
  let summerCampSwimSettings: Result<SummerCampSwimSetting[]> = await getSummerCampSwimPrices(currentAdmin?.accessToken!);
  let summerCampPromoSettings: Result<any> = await getSummerCampPromoSettings(currentAdmin?.accessToken!);

  let vacationCampScheduleSetttings: Result<any> = await getVacationCampSchedulesSettings(currentAdmin?.accessToken!);
  let programYearCycleSetting: Result<ProgramYearCycleSetting> = await getProgramYearCycleSettings(currentAdmin?.accessToken!);

  console.log('promos ', summerCampPromoSettings);
  console.log('vacation camp ', vacationCampScheduleSetttings)
  return (
    <div className="rounded bg-white drop-shadow-lg py-4 px-8 space-y-4">
      <AdminHeaderWithEntries headerText='Settings' />
      <TabsContainer summerCampWeekSettings={summerCampWeekSettings.data ?? []}
        summerCampSwimSettings={summerCampSwimSettings.data ?? []}
        programYearCycleSetting={programYearCycleSetting.data!} />
    </div>
  )
}