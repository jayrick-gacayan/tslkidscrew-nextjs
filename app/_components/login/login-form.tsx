import { ChangeEvent, useState } from "react";
import InputCustom from "@/app/_components/input-custom";
import PasswordIcon from "../password-icon";
import { LoginFormStateProps } from "@/types/props/login-form-state-props";

export default function LoginForm({
  role,
  state,
}: {
  role: string;
  state?: LoginFormStateProps;
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
        defaultValue={state?.email?.value}
        onChange={onChange}
        className="bg-secondary border-transparent p-2 px-3"
        errorText={state?.email?.errorText}
        validationStatus={state?.email?.validationStatus} />
      <InputCustom labelText="Password"
        id='login-password'
        name='password'
        placeholder="Password:"
        type={passwordShow ? 'text' : 'password'}
        suffixIcon={<PasswordIcon passwordShow={passwordShow} onPasswordShown={setPasswordShow} />}
        onChange={onChange}
        defaultValue={state?.password?.value}
        className="bg-secondary border-transparent p-2 px-3 pr-10"
        errorText={state?.password?.errorText}
        validationStatus={state?.password?.validationStatus} />
    </div>
  )
}