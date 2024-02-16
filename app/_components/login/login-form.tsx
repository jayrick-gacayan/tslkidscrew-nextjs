import { ChangeEvent, useState } from "react";
import InputCustom from "@/app/_components/input-custom";
import PasswordIcon from "../password-icon";

export default function LoginForm({
  role,
  state,
}: {
  role: string;
  state?: any;
}) {
  const [passwordShow, setPasswordShow] = useState<boolean>(false);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    let inputField = event.target as HTMLInputElement;
    inputField.setCustomValidity('');
  }

  return (
    <div className="space-y-2">
      <input type='hidden' name='role' value={role} />
      <InputCustom labelText="Email"
        id='login-email'
        name='email'
        type="text"
        placeholder="Email Address:"
        onChange={onChange}
        className="bg-secondary border-transparent p-2 px-3"
        errorText={state?.email?.errorText}
        validationType={state?.email?.errorText} />
      <InputCustom labelText="Password"
        id='login-password'
        name='password'
        placeholder="Password:"
        type={passwordShow ? 'text' : 'password'}
        suffixIcon={<PasswordIcon passwordShow={passwordShow} onPasswordShown={setPasswordShow} />}
        onChange={onChange}
        className="bg-secondary border-transparent p-2 px-3 pr-10"
        errorText={state?.password?.errorText}
        validationType={state?.password?.errorText} />
    </div>
  )
}