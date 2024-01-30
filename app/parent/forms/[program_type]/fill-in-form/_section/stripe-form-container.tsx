'use client';

import CustomCheckbox from "@/app/_components/custom-checkbox";

export default function StripeFormContainer() {
  return (
    <div className="relative">
      <div className="space-y-2 border border-secondary-light p-3 rounded">
        <CustomCheckbox value={true}
          onChange={(value: boolean) => {
            return;
          }} text='Credit Card' />
        <div className="bg-danger/20 border border-danger rounded p-4 space-y-2">
          <div className="block">Note:</div>
          <ul className="list-disc list-inside space-y-1">
            <li>Please tick the box if you will be using a credit card. This will incur additional 3% of the total amount.</li>
            <li>Please be aware, if you pay by credit card, the payee will be responsible for all associated transaction fees.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}