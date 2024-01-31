'use client';

import CustomInput from "@/app/_components/custom-input";
import { Fa6SolidLocationDot } from "@/app/_components/svg/fa6-solid-location-dot";
import { Fa6SolidPhone } from "@/app/_components/svg/fa6-solid-phone";
import { ValidationType } from "@/types/enums/validation-type";
import { Tab } from "@headlessui/react";

export default function PersonalDetails() {
  return (
    <Tab.Panel as='div' className="space-y-8">
      <h1 className="text-[32px] font-medium">Personal Details</h1>
      <div className="space-y-4">

        <div className="flex items-center gap-4">
          <CustomInput labelText='Firstname'
            placeholder="Firstname"
            fieldInput={{ value: '', errorText: '', validationStatus: ValidationType.NONE }}
            type='text' />
          <CustomInput labelText='Lastname'
            placeholder="Lastname"
            fieldInput={{ value: '', errorText: '', validationStatus: ValidationType.NONE }}
            type='text' />
        </div>
      </div>

      <div className="space-y-4">
        <CustomInput labelText='Emergency Number'
          placeholder="Emergency Number"
          iconPrefix={
            <div className="flex-none text-warning p-2">
              <Fa6SolidPhone />
            </div>
          }
          fieldInput={{ value: '09052050255', errorText: '', validationStatus: ValidationType.NONE }}
          type='text' />
        <CustomInput labelText='Phone Number'
          placeholder="Phone Number"
          iconPrefix={
            <div className="flex-none text-warning p-2">
              <Fa6SolidPhone />
            </div>
          }
          fieldInput={{ value: '09052050255', errorText: '', validationStatus: ValidationType.NONE }}
          type='text' />
      </div>

      <div className="space-y-4">
        <h3 className="text-tertiary">LOCATION</h3>
        <CustomInput labelText='Address Line 1'
          placeholder="Address Line 1"
          iconPrefix={
            <div className="flex-none text-warning p-2">
              <Fa6SolidLocationDot />
            </div>
          }
          fieldInput={{ value: 'Cebu City', errorText: '', validationStatus: ValidationType.NONE }}
          type='text' />
        <CustomInput labelText='Address Line 2'
          placeholder="Address Line 2"
          iconPrefix={
            <div className="flex-none text-warning p-2">
              <Fa6SolidLocationDot />
            </div>
          }
          fieldInput={{ value: 'Cebu City', errorText: '', validationStatus: ValidationType.NONE }}
          type='text' />
        <CustomInput labelText='City'
          placeholder="City"
          iconPrefix={
            <div className="flex-none text-warning p-2">
              <Fa6SolidLocationDot />
            </div>
          }
          fieldInput={{ value: 'Cebu', errorText: '', validationStatus: ValidationType.NONE }}
          type='text' />
        <CustomInput labelText='State'
          placeholder="State"
          iconPrefix={
            <div className="flex-none text-warning p-2">
              <Fa6SolidLocationDot />
            </div>
          }
          fieldInput={{ value: 'Cebu', errorText: '', validationStatus: ValidationType.NONE }}
          type='text' />
        <CustomInput labelText='Zipcode'
          inputMode="numeric"
          placeholder="Zipcode"
          iconPrefix={
            <div className="flex-none text-warning p-2">
              <Fa6SolidLocationDot />
            </div>
          }
          fieldInput={{ value: 'Cebu', errorText: '', validationStatus: ValidationType.NONE }}
          type='text' />
      </div>
      <div className="w-fit ml-auto block space-x-4">
        <button className="p-2 text-danger border border-danger rounded">
          Cancel my account
        </button>
        <button className="p-2 text-white border border-primary rounded bg-primary">
          Update
        </button>
      </div>
    </Tab.Panel>
  )
}