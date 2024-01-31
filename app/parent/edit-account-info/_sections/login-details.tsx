'use client';

import CustomInput from "@/app/_components/custom-input";
import { Fa6SolidEnvelope } from "@/app/_components/svg/fa6-solid-envelope";
import { Fa6SolidLock } from "@/app/_components/svg/fa6-solid-lock";
import { ValidationType } from "@/types/enums/validation-type";
import { Tab } from "@headlessui/react";

export default function LoginDetails() {
  return (
    <Tab.Panel as='div' className="space-y-8">
      <h1 className="text-[32px] font-medium">Login Details</h1>
      <div className="space-y-4">
        <CustomInput labelText='Email'
          iconPrefix={
            <div className="flex-none text-warning p-2">
              <Fa6SolidEnvelope />
            </div>
          }
          placeholder="Email"
          fieldInput={{ value: 'deanver@kodakollectiv.com', errorText: '', validationStatus: ValidationType.NONE }}
          type='text' />
        <CustomInput labelText='Password'
          iconPrefix={
            <div className="flex-none text-warning p-2">
              <Fa6SolidLock />
            </div>
          }
          placeholder="Lastname"
          fieldInput={{ value: '', errorText: '', validationStatus: ValidationType.NONE }}
          type='password' />
        <CustomInput labelText='Confirm Password'
          placeholder="Confirm Password"
          iconPrefix={
            <div className="flex-none text-warning p-2">
              <Fa6SolidLock />
            </div>
          }
          fieldInput={{ value: '', errorText: '', validationStatus: ValidationType.NONE }}
          type='password' />
      </div>
      <div className="w-fit ml-auto block space-x-4">
        <button className="p-2 text-white border border-primary rounded bg-primary">
          Save Changes
        </button>
      </div>
    </Tab.Panel>
  )
}