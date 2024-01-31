'use client';

import CustomInput from "@/app/_components/custom-input";
import { ValidationType } from "@/types/enums/validation-type";
import { useState } from "react";
import { Fa6SolidEyeSlash } from "@/app/_components/svg/fa6-solid-eye-slash";
import { Fa6SolidEye } from "@/app/_components/svg/fa6-solid-eye";

export default function LoginForm() {
  const [passwordShow, setPasswordShow] = useState<boolean>(false);

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
        }
      />
    </div>
  )
}