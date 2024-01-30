'use client';

import CustomTabItem from "@/app/_components/custom-tab-item";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import PersonalDetails from "./personal-details";
import LoginDetails from "./login-details";
import BillingInfo from "./billing-info";

export default function TabsEditAccountContainer() {

  function classNameTab(selected: boolean) {
    return `p-2 border-b-0 border-b-none`;
  }

  return (
    <Tab.Group as={Fragment}>

      <div className="rounded w-[1024px] flex items-stretch overflow-hidden divide-x divide-x-secondary-light m-auto pb-12">
        <div className="flex-none w-[256px] bg-secondary p-8 space-y-4">
          <CustomTabItem labelText='Personal Details' classNameTab={classNameTab} />
          <CustomTabItem labelText='Login Details' classNameTab={classNameTab} />
          <CustomTabItem labelText='Billing Info' classNameTab={classNameTab} />
        </div>
        <Tab.Panels as='div' className='flex-1 p-8 bg-white'>
          <PersonalDetails />
          <LoginDetails />
          <BillingInfo />
        </Tab.Panels>
      </div>
    </Tab.Group>
  )
}