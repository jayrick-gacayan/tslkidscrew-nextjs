import { auth } from "@/auth";
import AdminHeaderWithEntries from "../_components/admin-header-with-entries";
import TabsContainer from "./_sections/tabs-container";
import { Admin } from "@/models/admin";
import { Session } from "next-auth";
import { getSummerCampSwimPrices, getSummerCampWeekPrices } from "@/services/program-settings";
import { Result } from "@/models/result";
import { SummerCampWeekSetting } from "@/models/summer-camp-week-setting";
import { SummerCampSwimSetting } from "@/models/summer-camp-swim-setting";

export default async function Page() {
  let currentAdmin: Session<Admin> | null = await auth();
  let summerCampWeekSettings: Result<SummerCampWeekSetting[]> = await getSummerCampWeekPrices(currentAdmin?.accessToken!);
  let summerCampSwimSettings: Result<SummerCampSwimSetting[]> = await getSummerCampSwimPrices(currentAdmin?.accessToken!);

  return (
    <div className="rounded bg-white drop-shadow-lg py-4 px-8 space-y-4">
      <AdminHeaderWithEntries headerText='Settings' />
      <TabsContainer summerCampWeekSettings={summerCampWeekSettings.data ?? []}
        summerCampSwimSettings={summerCampSwimSettings.data ?? []} />
    </div>
  )
}