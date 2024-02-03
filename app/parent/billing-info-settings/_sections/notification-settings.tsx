import { Tab } from "@headlessui/react";
import EnableAutopay from "./enable-autopay";
import EmailReceivedNotificationsContainer from "./email-received-notications-container";

export default function NotificationSettings() {
  return (
    <Tab.Panel as='div' className="space-y-4">
      <div className="divide-y divide-y-secondary-light">
        <EnableAutopay />
        <EmailReceivedNotificationsContainer />
      </div>
    </Tab.Panel>
  )
}