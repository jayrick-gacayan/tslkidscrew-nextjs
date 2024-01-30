'use client';

import { useState } from "react";
import FormsRadioButton from "../_components/forms-radio-button";
import Link from "next/link";

export default function StepThreeFormSummerCamp() {
  const [registerType, setRegisterType] = useState('');

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-black">
        <h1 className="font-medium text-[36px]">Choose your registration type</h1>
      </div>
      <div className="space-y-2">
        <div className="space-y-2">
          <FormsRadioButton labelText='The Kids Crew Summer Specials: Pay for summer upfront SAVE 10%, and no registration fee.'
            value='special'
            current={registerType}
            onChange={(value: string) => { setRegisterType(value); }} />
          <FormsRadioButton labelText='Regular Registration'
            value='regular'
            current={registerType}
            onChange={(value: string) => { setRegisterType(value); }} />
        </div>
      </div>
      {
        registerType !== '' &&
        (
          <div className="block">
            {
              registerType === 'regular' ?
                (
                  <div className="font-medium text-[18px]">
                    If a week is not shown, it means that it is at the capacity. Contact
                    <Link href='mailto:tsladventures@gmail.com'
                      className="text-primary hover:underline mx-1">
                      tsladventures@gmail.com
                    </Link>
                    to request being added to any closed week. Your request may or may not be accommodated.
                  </div>
                ) :
                (
                  <div className="space-y-2">
                    <h1 className="text-[24px]">Promo Packages</h1>
                  </div>
                )

            }

          </div>
        )
      }
    </div>
  )
}