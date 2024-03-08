import { auth } from "@/auth";
import { Parent } from "@/models/parent";
import { getCustomerInfo } from "@/services/parent-info-services";
import { Session } from "next-auth";
import BillingInfoSettingsTabContainer from "./_sections/billing-info-settings-tab-container";

export default async function Page() {
  let parent: Session | null = await auth();

  let result = await getCustomerInfo(parent?.user?.customer_id?.toString()!, parent?.user?.accessToken!)

  return (<BillingInfoSettingsTabContainer parent={result.data ?? undefined} />)
}