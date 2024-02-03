'use client';

import CustomInput from "@/app/_components/custom-input";
import { ValidationType } from "@/types/enums/validation-type";
import EnvelopeIcon from "../../_components/envelope-icon";
import EmailListNotifications from "./email-list-notifications";

export default function EmailReceivedNotificationsContainer() {
  return (
    <div className="py-8">
      <div className="space-y-8">
        <h3 className="font-medium">Other email accounts for receiving notifications.</h3>
        <div className="space-y-1">
          <div className="font-medium">Email</div>
          <div className="rounded w-full p-4 flex sm:flex-row flex-col items-center bg-secondary gap-4">
            <div className="flex-1 ">
              <CustomInput type='text'
                fieldInput={{ value: 'jake@kodakollectiv.com', errorText: '', validationStatus: ValidationType.NONE }}
                iconPrefix={<EnvelopeIcon />} />
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