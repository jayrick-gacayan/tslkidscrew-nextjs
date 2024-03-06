'use client';

import { registerParentAction, roleLogin } from "@/actions/auth-actions";
import InputCustom from "@/app/_components/input-custom";
import PasswordIcon from "@/app/_components/password-icon";
import Spinners3DotsScale from "@/app/_components/svg/spinners3-dots-scale";
import { fieldInputValue } from "@/types/helpers/field-input-value";
import { ParentRegisterFormStateProps } from "@/types/props/parent-register-form-state-props";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { ToastContentProps, toast } from "react-toastify";

function ButtonSubmit() {
  const { pending } = useFormStatus();

  return (
    <div className="w-full space-y-2">
      <button className="bg-primary px-4 py-2 w-48 text-white rounded ml-auto block disabled:cursor-not-allowed"
        disabled={pending}>
        {
          !pending ? 'Register' :
            (
              <>
                <Spinners3DotsScale /> Checking
              </>
            )
        }
      </button>
      <div>
        <span>Already have an account? </span>
        <Link href='/parent/login'
          className="text-primary hover:underline font-medium">
          Login
        </Link>
      </div>
    </div>
  )
}

export default function RegisterForm() {
  const formRef = useRef<HTMLFormElement>(null)

  const [state, formAction] = useFormState(registerParentAction, {
    email: fieldInputValue(''),
    password: fieldInputValue(''),
    confirm_password: fieldInputValue('')
  } as ParentRegisterFormStateProps);
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [passwordConfirmationShow, setPasswordConfirmationShow] = useState<boolean>(false);

  useEffect(() => {
    async function autoLoginAccount() {
      let formData = new FormData();
      formData.set('email', state?.email?.value ?? '');
      formData.set('password', state?.password?.value ?? '');
      formData.set('role', 'parent');

      let result = await roleLogin('/parent/dashboard', {
        email: fieldInputValue(state.email?.value ?? '')
      }, formData);

    }

    if (state.success !== undefined) {
      let { message, success } = state;
      toast((props: ToastContentProps<unknown>) => {
        return (
          <div className="text-black">{message}</div>
        )
      }, {
        toastId: `parent-register-success-${Date.now()}`,
        type: success ? 'success' : 'error',
        hideProgressBar: true,
      });

      if (success) {
        autoLoginAccount();
      }
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div className="space-y-2">
        <InputCustom labelText="Email"
          id='register-email'
          placeholder="Email Address:"
          name='email'
          type="text"
          className="bg-secondary border-transparent p-2 px-3"
          defaultValue={state.email?.value}
          errorText={state.email?.errorText}
          validationStatus={state.email?.validationStatus} />
        <InputCustom labelText="Password"
          id='register-password'
          name='password'
          placeholder="Password:"
          type={passwordShow ? 'text' : 'password'}
          suffixIcon={<PasswordIcon passwordShow={passwordShow} onPasswordShown={setPasswordShow} />}
          className="bg-secondary border-transparent p-2 px-3 pr-10"
          defaultValue={state.password?.value}
          errorText={state.password?.errorText}
          validationStatus={state.password?.validationStatus} />
        <InputCustom labelText="Confirm Password"
          id='register-password-confirmation'
          name='confirm_password'
          placeholder="Confirm Password:"
          type={passwordConfirmationShow ? 'text' : 'password'}
          suffixIcon={<PasswordIcon passwordShow={passwordConfirmationShow} onPasswordShown={setPasswordConfirmationShow} />}
          className="bg-secondary border-transparent p-2 px-3 pr-10"
          defaultValue={state.confirm_password?.value}
          errorText={state.confirm_password?.errorText}
          validationStatus={state.confirm_password?.validationStatus} />
      </div>
      <ButtonSubmit />
    </form>
  )
}
