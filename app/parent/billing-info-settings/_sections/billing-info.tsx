'use client';

import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import CardDetails from './card-details';
import CustomTabItem from '@/app/_components/custom-tab-item';
import BankDetails from './bank-details';
import NotificationSettings from './notification-settings';
import { Parent } from '@/models/parent';

export default function BillingInfo({ parent }: { parent: Partial<Parent> | undefined; }) {

  return (
    <Tab.Panel as='div' className='space-y-8'>
      <h1 className='text-[32px] font-medium'>Billing Info</h1>
      <Tab.Group as={Fragment}>
        <div className='space-y-8 w-full'>
          <div className='pb-4 sm:pb-0'>
            <div className='flex items-center flex-nowrap overflow-auto w-full'>
              <CustomTabItem labelText='Card Details' />
              <CustomTabItem labelText='Bank Details' />
              <CustomTabItem labelText='Notification Settings' />
            </div>
          </div>
          <Tab.Panels as={Fragment}>
            <CardDetails cardDetails={!parent ? undefined : parent as Pick<Parent, 'card_last_four' | 'card_brand'>} />
            <BankDetails bankDetails={!parent ? undefined : parent as Pick<Parent, 'bank_name' | 'bank_verified' | 'stripe_bank_identifier'>} />
            <NotificationSettings />
          </Tab.Panels>
        </div>
      </Tab.Group>
    </Tab.Panel>
  );
}