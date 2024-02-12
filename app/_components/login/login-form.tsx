import { ChangeEvent, useState } from "react";
import Fa6SolidEyeSlash from "@/app/_components/svg/fa6-solid-eye-slash";
import Fa6SolidEye from "@/app/_components/svg/fa6-solid-eye";
import InputCustom from "@/app/_components/input-custom";

export default function LoginForm() {
  const [passwordShow, setPasswordShow] = useState<boolean>(false);

  const PasswordIcon = passwordShow ? Fa6SolidEyeSlash : Fa6SolidEye;

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
        suffixIcon={
          <PasswordIcon className="text-default/90 absolute right-3 z-20 top-3 block cursor-pointer peer-invalid:text-danger"
            onClick={() => { setPasswordShow(passwordShow ? false : true) }} />
        }
        onChange={onChange}
        className="bg-secondary border-transparent p-2 px-3 pr-10" />
    </div>
  )
}