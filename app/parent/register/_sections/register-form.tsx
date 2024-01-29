'use client';

import CustomInput from "@/app/_components/custom-input";
import { ValidationType } from "@/types/enums/validation-type";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

export default function RegisterForm() {
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [passwordConfirmationShow, setPasswordConfirmationShow] = useState<boolean>(false);

  return (
    <div className="space-y-2">
      <CustomInput labelText='Email'
        fieldInput={{ value: '', errorText: '', validationStatus: ValidationType.NONE }}
        type='email'
        onChange={(value: string) => { return; }} />
      <CustomInput labelText='Password'
        fieldInput={{ value: '', errorText: '', validationStatus: ValidationType.NONE }}
        type={passwordShow ? 'text' : 'password'}
        onChange={(value: string) => { return; }}
        iconSuffix={
          <div className="p-2 text-default/90"
            onClick={() => { setPasswordShow(!passwordShow) }}>
            <Icon icon={`fa6-solid:${passwordShow ? `eye-slash` : `eye`}`} />
          </div>
        } />
      <CustomInput labelText='Confirm Password'
        fieldInput={{ value: '', errorText: '', validationStatus: ValidationType.NONE }}
        type={passwordConfirmationShow ? 'text' : 'password'}
        onChange={(value: string) => { return; }}
        iconSuffix={
          <div className="p-2 text-default/90"
            onClick={() => { setPasswordShow(!passwordConfirmationShow) }}>
            <Icon icon={`fa6-solid:${passwordConfirmationShow ? `eye-slash` : `eye`}`} />
          </div>
        } />

    </div>
  )
}