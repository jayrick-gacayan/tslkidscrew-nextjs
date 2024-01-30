'use client';

import CustomInput from "@/app/_components/custom-input";
import { ValidationType } from "@/types/enums/validation-type";
import { Tab } from "@headlessui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Fragment } from "react";

export default function LoginDetails() {
  return (
    <Tab.Panel as='div' className="space-y-8">
      <h1 className="text-[32px] font-medium">Login Details</h1>
      <div className="space-y-4">
        <CustomInput labelText='Email'
          iconPrefix={
            <div className="flex-none text-warning p-2">
              <Icon icon="fa6-solid:envelope" />
            </div>
          }
          placeholder="Email"
          fieldInput={{ value: 'deanver@kodakollectiv.com', errorText: '', validationStatus: ValidationType.NONE }}
          type='text' />
        <CustomInput labelText='Password'
          iconPrefix={
            <div className="flex-none text-warning p-2">
              <Icon icon="fa6-solid:lock" />
            </div>
          }
          placeholder="Lastname"
          fieldInput={{ value: '', errorText: '', validationStatus: ValidationType.NONE }}
          type='password' />
        <CustomInput labelText='Confirm Password'
          placeholder="Confirm Password"
          iconPrefix={
            <div className="flex-none text-warning p-2">
              <Icon icon="fa6-solid:lock" />
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