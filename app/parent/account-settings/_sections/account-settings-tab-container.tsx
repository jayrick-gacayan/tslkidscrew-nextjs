'use client';

import CustomTabItem from "@/app/_components/custom-tab-item";
import { Tab } from "@headlessui/react";
import PersonalDetails from "./personal-details";
import LoginDetails from "./login-details";
import { AccountInfoForParent } from "../prop-types/custom-pick-parent";

export default function AccountSettingsTabContainer({ parent }: { parent: AccountInfoForParent | undefined }) {

  function classNameTab(selected: boolean) {
    return `p-2 border-b-0 border-b-none`;
  }

  return (
    <Tab.Group as='div' className='flex-1'>
      <div className="rounded w-full lg:w-[1024px] min-h-[560px] h-full flex lg:flex-row flex-col overflow-hidden divide-x divide-x-secondary-light m-auto pb-12">
        <div className="flex-none w-full lg:w-[256px] flex lg:flex-col flex-row bg-secondary p-8 space-y-0 lg:space-y-4">
          <CustomTabItem labelText='Personal Details' classNameTab={classNameTab} />
          <CustomTabItem labelText='Login Details' classNameTab={classNameTab} />
        </div>
        <Tab.Panels as='div' className='flex-1 p-8 bg-white'>
          <PersonalDetails parent={parent} />
          <LoginDetails email={parent?.email ?? ''} />
        </Tab.Panels>
      </div>
    </Tab.Group>
  )
}