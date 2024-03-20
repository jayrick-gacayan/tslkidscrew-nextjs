import { Result } from "@/models/result";
import AccountSettingsTabContainer from "./_sections/account-settings-tab-container";
import { getCustomerInfoAction } from "@/actions/parent-info-actions";
import { Parent } from "@/models/parent";
import { AccountInfoForParent } from "./prop-types/custom-pick-parent";

export default async function Page() {

  let result: Result<Parent> = await getCustomerInfoAction();

  let parent: Parent | null | undefined = result.data;

  return (<AccountSettingsTabContainer parent={!parent ? undefined : parent as AccountInfoForParent} />);
}