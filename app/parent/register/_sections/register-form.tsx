'use client';

import CustomInput from "@/app/_components/custom-input";
import { Fa6SolidEye } from "@/app/_components/svg/fa6-solid-eye";
import { Fa6SolidEyeSlash } from "@/app/_components/svg/fa6-solid-eye-slash";
import { ValidationType } from "@/types/enums/validation-type";
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
            {passwordShow ? <Fa6SolidEyeSlash /> : <Fa6SolidEye />}
          </div>
        } />
      <CustomInput labelText='Confirm Password'
        fieldInput={{ value: '', errorText: '', validationStatus: ValidationType.NONE }}
        type={passwordConfirmationShow ? 'text' : 'password'}
        onChange={(value: string) => { return; }}
        iconSuffix={
          <div className="p-2 text-default/90"
            onClick={() => { setPasswordShow(!passwordConfirmationShow) }}>
            {passwordConfirmationShow ? <Fa6SolidEyeSlash /> : <Fa6SolidEye />}
          </div>
        } />

    </div>
  )
}