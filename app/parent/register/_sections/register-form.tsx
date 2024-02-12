'use client';

import InputCustom from "@/app/_components/input-custom";
import Fa6SolidEye from "@/app/_components/svg/fa6-solid-eye";
import Fa6SolidEyeSlash from "@/app/_components/svg/fa6-solid-eye-slash";
import { Dispatch, ForwardedRef, SVGProps, SetStateAction, forwardRef, useState } from "react";
interface PasswordIconProps extends SVGProps<SVGSVGElement> {
  passwordShow: boolean;
  onPasswordShown: Dispatch<SetStateAction<boolean>>
}

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

const PasswordIcon = forwardRef<
  SVGSVGElement,
  PasswordIconProps
>(
  (
    { passwordShow, onPasswordShown, ...props }: PasswordIconProps,
    ref: ForwardedRef<SVGSVGElement>) => {
    const IconPassword = passwordShow ? Fa6SolidEyeSlash : Fa6SolidEye;
    return <IconPassword {...props}
      ref={ref}
      onClick={() => { onPasswordShown(passwordShow ? false : true); }}
      className="text-default/90 absolute right-3 z-20 top-3 block cursor-pointer" />;
  }
);