import { auth } from "@/auth";
import AdminHeaderWithEntries from "../_components/admin-header-with-entries";
import TabsContainer from "./_sections/tabs-container";
import { Admin } from "@/models/admin";
import { Session } from "next-auth";
import { getSummerWeekPrices } from "@/services/program-settings";
import { Result } from "@/models/result";
import { SummerCampWeekSetting } from "@/models/summer-week-setting";

export default async function Page() {
  let currentAdmin: Session<Admin> | null = await auth();
  let summerWeekPrices: Result<SummerCampWeekSetting[]> = await getSummerWeekPrices(currentAdmin?.accessToken!)

  return (
    <div className="rounded bg-white drop-shadow-lg py-4 px-8 space-y-4">
      <AdminHeaderWithEntries headerText='Settings' />
      <TabsContainer summerWeekPrices={summerWeekPrices.data ?? []} />
    </div>
  )
}