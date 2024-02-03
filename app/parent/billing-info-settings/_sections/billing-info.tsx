'use client';

import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import CardDetails from "./card-details";
import CustomTabItem from "@/app/_components/custom-tab-item";
import BankDetails from "./bank-details";
import NotificationSettings from "./notification-settings";

export default function BillingInfo() {
  return (
    <Tab.Panel as='div' className="space-y-8">
      <h1 className="text-[32px] font-medium">Billing Info</h1>

      <Tab.Group as={Fragment}>
        <div className='space-y-8 w-full'>
          <div className="pb-4 sm:pb-0">
            <div className='flex items-center flex-nowrap overflow-auto w-full'>
              <CustomTabItem labelText='Card Details' />
              <CustomTabItem labelText='Bank Details' />
              <CustomTabItem labelText='Notification Settings' />
            </div>
          </div>
          <Tab.Panels as={Fragment}>
            <CardDetails />
            <BankDetails />
            <NotificationSettings />
          </Tab.Panels>
        </div>
      </Tab.Group>
    </Tab.Panel>
  )
}