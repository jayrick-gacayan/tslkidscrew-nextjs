'use client';

import { useFormState } from 'react-dom';
import LoginForm from '@/app/_components/login/login-form';
import { roleLogin } from '@/actions/auth-actions';
import LoginButtons from '@/app/_components/login/login-buttons';
import RememberMe from '@/app/_components/login/remember-me';
import { useEffect, useRef } from 'react';
import { fieldInputValue } from '@/types/helpers/field-input-value';
import { LoginFormStateProps } from '@/types/props/login-form-state-props';
import { redirectToPath } from '@/actions/common-actions';
import { toast, ToastContentProps } from 'react-toastify';

export default function FormContainer() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(
    roleLogin.bind(null, '/parent/dashboard'),
    {
      email: fieldInputValue<string>(''),
      password: fieldInputValue<string>(''),
    } as LoginFormStateProps
  );

  useEffect(() => {
    async function pathToRedirect(redirectTo: string) {
      await redirectToPath(redirectTo);
    }

    if (state?.success) {
      if (state.success && state?.redirectTo) {
        toast((props: ToastContentProps<unknown>) => {
          return (
            <div className="text-black">
              {state?.message}
            </div>
          )
        }, {
          toastId: `parent-login-success-${Date.now()}`,
          type: 'success',
          hideProgressBar: true,
        });
        formRef.current?.reset();
        pathToRedirect(state.redirectTo)
      }
    }
  }, [
    state?.redirectTo,
    state?.success,
  ]);

  return (
    <form action={formAction} ref={formRef} className='space-y-4'>
      <LoginForm state={state} role='parent' />
      <RememberMe role='parent' />
      <LoginButtons role='parent' />
    </form>
  )

}