'use client';

import EmailListNotifications from "./email-list-notifications";
import InputCustom from "@/app/_components/input-custom";
import Fa6SolidEnvelope from "@/app/_components/svg/fa6-solid-envelope";

export default function EmailReceivedNotificationsContainer() {
  return (
    <div className="py-8">
      <div className="space-y-8">
        <h3 className="font-medium">Other email accounts for receiving notifications.</h3>
        <div className="space-y-1">
          <div className="font-medium">Email</div>
          <div className="rounded w-full p-4 flex sm:flex-row flex-col items-center bg-secondary gap-4">
            <div className="flex-1">
              <InputCustom labelText="Email Address"
                id="email-address-notification"
                name="email-address-notification"
                className="bg-inherit p-2 pl-10 border-transparent"
                placeholder="Email Address:"
                type="text"
                value='jake@kodakollectiv.com'
                prefixIcon={<PrefixEnvelopeIcon />}
              />
            </div>
            <div className="flex-none w-full sm:w-auto">
              <button className="w-full py-1 px-4 text-white rounded bg-primary">
                Add
              </button>
            </div>
          </div>
        </div>
        <EmailListNotifications />
      </div>
    </div>
  )
}

const PrefixEnvelopeIcon = () => {
  return (<Fa6SolidEnvelope className="text-warning absolute left-3 z-20 top-3 block peer-invalid:text-danger" />);
}
