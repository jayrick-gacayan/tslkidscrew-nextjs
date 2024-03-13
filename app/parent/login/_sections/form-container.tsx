'use client';

import { useFormState } from 'react-dom';
import LoginForm from '@/app/_components/login/login-form';
import { roleLogin } from '@/actions/auth-actions';
import LoginButtons from '@/app/_components/login/login-buttons';
import RememberMe from '@/app/_components/login/remember-me';
import { useEffect, useRef } from 'react';
import { fieldInputValue } from '@/types/helpers/field-input-value';
import { LoginFormStateProps } from '@/types/props/login-form-state-props';
import { toast, ToastContentProps } from 'react-toastify';

export default function FormContainer() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(
    roleLogin.bind(null, '/parent/dashboard'),
    {
      email: fieldInputValue<string>(''),
      password: fieldInputValue<string>(''),
    } as LoginFormStateProps || {}
  );

  useEffect(() => {
    let { message } = state;

    if (message) {
      toast((props: ToastContentProps<unknown>) => {
        return (<div className='text-black'>{message}</div>);
      }, {
        toastId: `admin-login-success-${Date.now()}`,
        type: 'error',
        hideProgressBar: true,
      });
    }
  }, [state]);

  return (
    <form action={formAction} ref={formRef} className='space-y-4'>
      <LoginForm state={state} role='parent' />
      <RememberMe role='parent' />
      <LoginButtons role='parent' />
    </form>
  )

}