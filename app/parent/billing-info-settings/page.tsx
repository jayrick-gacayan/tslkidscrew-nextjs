import BillingInfoSettingsTabContainer from "./_sections/billing-info-settings-tab-container";
import { getCustomerInfoAction } from "@/actions/parent-info-actions";

export default async function Page() {
  let result = await getCustomerInfoAction();

  console.log('result', result.data)
  return (<BillingInfoSettingsTabContainer parent={result.data ?? undefined} />)
}