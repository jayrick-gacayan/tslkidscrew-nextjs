'use client';

import CustomInput from "@/app/_components/custom-input";
import { ValidationType } from "@/types/enums/validation-type";
import { useState } from "react";
import { Icon } from '@iconify/react';

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
            <Icon icon={`fa6-solid:${passwordShow ? `eye-slash` : `eye`}`} />
          </div>
        }
      />
    </div>
  )
}