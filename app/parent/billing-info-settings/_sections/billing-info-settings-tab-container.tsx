'use client';

import CustomTabItem from '@/app/_components/custom-tab-item';
import { Tab } from '@headlessui/react';
import BillingInfo from './billing-info';
import { Parent } from '@/models/parent';

export default function BillingInfoSettingsTabContainer({ parent }: { parent: Partial<Parent> | undefined; }) {

  function classNameTab(selected: boolean) { return `p-2 border-b-0 border-b-none`; }

  return (
    <Tab.Group as='div' className='flex-1'>
      <div className='rounded w-full h-full lg:w-[1024px] flex lg:flex-row flex-col items-stretch overflow-hidden divide-x divide-x-secondary-light m-auto pb-12'>
        <div className='flex-none w-full lg:w-[256px] flex lg:flex-col flex-row bg-secondary p-8 space-y-0 lg:space-y-4'>
          <CustomTabItem labelText='Billing Info' classNameTab={classNameTab} />
        </div>
        <Tab.Panels as='div' className='flex-1 p-8 bg-white'>
          <BillingInfo parent={parent} />
        </Tab.Panels>
      </div>
    </Tab.Group>
  )
}