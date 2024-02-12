'use client';

import InputCustom from "@/app/_components/input-custom";
import PasswordIcon from "@/app/_components/password-icon";
import { useState } from "react";

export default function RegisterForm() {
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [passwordConfirmationShow, setPasswordConfirmationShow] = useState<boolean>(false);

  return (
    <div className="space-y-2">
      <InputCustom labelText="Email"
        id='register-email'
        placeholder="Email Address:"
        name='email'
        type="text"
        className="bg-secondary border-transparent p-2 px-3" />
      <InputCustom labelText="Password"
        id='register-password'
        name='password'
        placeholder="Password:"
        type={passwordShow ? 'text' : 'password'}
        suffixIcon={<PasswordIcon passwordShow={passwordShow} onPasswordShown={setPasswordShow} />}
        className="bg-secondary border-transparent p-2 px-3 pr-10" />
      <InputCustom labelText="Confirm Password"
        id='register-password-confirmation'
        name='password-confirmation'
        placeholder="Confirm Password:"
        type={passwordConfirmationShow ? 'text' : 'password'}
        suffixIcon={<PasswordIcon passwordShow={passwordConfirmationShow} onPasswordShown={setPasswordConfirmationShow} />}
        className="bg-secondary border-transparent p-2 px-3 pr-10" />
    </div>
  )
}
