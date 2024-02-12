import { ChangeEvent, useState } from "react";
import InputCustom from "@/app/_components/input-custom";
import PasswordIcon from "../password-icon";

export default function LoginForm() {
  const [passwordShow, setPasswordShow] = useState<boolean>(false);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    let inputField = event.target as HTMLInputElement;

    inputField.setCustomValidity('');
  }

  return (
    <div className="space-y-2">
      <InputCustom labelText="Email"
        id='login-email'
        name='email'
        type="text"
        placeholder="Email Address:"
        onChange={onChange}
        className="bg-secondary border-transparent p-2 px-3" />
      <InputCustom labelText="Password"
        id='login-password'
        name='password'
        placeholder="Password:"
        type={passwordShow ? 'text' : 'password'}
        suffixIcon={<PasswordIcon passwordShow={passwordShow} onPasswordShown={setPasswordShow} />}
        onChange={onChange}
        className="bg-secondary border-transparent p-2 px-3 pr-10" />
    </div>
  )
}