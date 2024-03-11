import AccountSettingsTabContainer from "./_sections/account-settings-tab-container";
import { getCustomerInfoAction } from "@/actions/parent-info-actions";

export default async function Page() {

  let result = await getCustomerInfoAction();

  return (
    <AccountSettingsTabContainer parent={!result.data ? undefined : {
      first_name: result?.data?.first_name,
      last_name: result?.data?.last_name,
      phone_number: result?.data?.phone_number,
      emergency_phone_number: result?.data?.emergency_phone_number,
      address_line_one: result?.data?.address_line_one,
      address_line_two: result?.data?.address_line_two,
      city: result?.data?.city,
      state: result?.data?.last_name,
      zip_code: result?.data?.zip_code,
      email: result?.data?.email,
    }} />
  );
}