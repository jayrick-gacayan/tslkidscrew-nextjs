'use client';

import CustomInput from "@/app/_components/custom-input";
import { ValidationType } from "@/types/enums/validation-type";
import { Tab } from "@headlessui/react";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function CardDetails() {
  return (
    <Tab.Panel as='div' className="space-y-8">

      <div className="space-y-4">
        <CustomInput labelText='Card Number'
          iconPrefix={
            <div className="flex-none text-warning p-2">
              <Icon icon="fa6-solid:credit-card" />
            </div>
          }
          placeholder="Card Number"
          fieldInput={{ value: '424242424242', errorText: '', validationStatus: ValidationType.NONE }}
          type='text' />
        <div className="flex items-center gap-4">
          <CustomInput labelText='Date Expiry'
            iconPrefix={
              <div className="flex-none text-warning p-2">
                <Icon icon="fa6-solid:calendar" />
              </div>
            }
            fieldInput={{ value: '', errorText: '', validationStatus: ValidationType.NONE }}
            type='month' />
          <CustomInput labelText='CVC'
            iconPrefix={
              <div className="flex-none text-warning p-2">
                <Icon icon="fa6-solid:lock" />
              </div>
            }
            placeholder="CVC"
            fieldInput={{ value: '12345678', errorText: '', validationStatus: ValidationType.NONE }}
            type='text' />
        </div>
      </div>
      <div className="w-fit ml-auto block space-x-4">
        <button className="p-2 text-white border border-primary rounded bg-primary">
          Add Card
        </button>
      </div>
    </Tab.Panel>
  )
}