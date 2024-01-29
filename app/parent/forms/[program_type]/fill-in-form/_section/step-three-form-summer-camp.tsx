'use client';

import { useState } from "react";
import FormsRadioButton from "../_components/forms-radio-button";

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
    </div>
  )
}