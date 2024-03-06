import { auth } from "@/auth";
import AdminHeaderWithEntries from "../_components/admin-header-with-entries";
import TabsContainer from "./_sections/tabs-container";
import { Admin } from "@/models/admin";
import { Session } from "next-auth";
import {
  getBeforeOrAfterSchoolSettings,
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
import { SummerCampPromoSetting } from "@/models/summer-camp-promo-setting";
import { VacationCampSetting } from "@/models/vacation-camp-setting";
import { BeforeOrAfterSchoolSetting } from "@/models/before-or-after-school-setting";

export default async function Page() {
  let currentAdmin: Session<Admin> | null = await auth();

  const [
    summerCampWeekSettings,
    summerCampSwimSettings,
    summerCampPromoSettings,
    vacationCampSettings,
    programYearCycleSetting,
    beforeOrAfterSchoolSettings,
  ]: [
      Result<SummerCampWeekSetting[]>,
      Result<SummerCampSwimSetting[]>,
      Result<SummerCampPromoSetting[]>,
      Result<VacationCampSetting[]>,
      Result<ProgramYearCycleSetting>,
      Result<BeforeOrAfterSchoolSetting[]>
    ] = await Promise.all([
      getSummerCampWeekPrices(currentAdmin?.accessToken!),
      getSummerCampSwimPrices(currentAdmin?.accessToken!),
      getSummerCampPromoSettings(currentAdmin?.accessToken!),
      getVacationCampSchedulesSettings(currentAdmin?.accessToken!),
      getProgramYearCycleSettings(currentAdmin?.accessToken!),
      getBeforeOrAfterSchoolSettings(currentAdmin?.accessToken!, '2024-2025')
    ]);

  return (
    <div className="rounded bg-white drop-shadow-lg py-4 px-8 space-y-4">
      <AdminHeaderWithEntries headerText='Settings' />
      <TabsContainer summerCampWeekSettings={summerCampWeekSettings.data ?? []}
        summerCampSwimSettings={summerCampSwimSettings.data ?? []}
        summerCampPromoSettings={summerCampPromoSettings.data ?? []}
        programYearCycleSetting={programYearCycleSetting.data!}
        vacationCampSettings={vacationCampSettings.data ?? []}
        beforeOrAfterSchoolSettings={beforeOrAfterSchoolSettings.data ?? []} />
    </div>
  )
}