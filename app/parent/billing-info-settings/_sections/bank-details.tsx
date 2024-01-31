'use client';

import { Tab } from "@headlessui/react";

export default function BankDetails() {
  return (
    <Tab.Panel as='div' className="space-y-4">
      <p>If you'd like to use a bank account instead, please link it below.</p>
      <div className="w-fit mr-auto block space-x-4">
        <button className="p-2 text-white border border-primary rounded bg-primary">
          Submit Bank Details
        </button>
      </div>
    </Tab.Panel>
  )
}