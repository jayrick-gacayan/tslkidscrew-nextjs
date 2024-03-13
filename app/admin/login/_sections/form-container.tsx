'use client';

import { useFormState } from 'react-dom';
import LoginForm from '@/app/_components/login/login-form';
import { useEffect, useRef } from 'react';
import { roleLogin } from '@/actions/auth-actions';
import LoginButtons from '@/app/_components/login/login-buttons';
import RememberMe from '@/app/_components/login/remember-me';
import { toast, ToastContentProps } from 'react-toastify';
import { LoginFormStateProps } from '@/types/props/login-form-state-props';
import { fieldInputValue } from '@/types/helpers/field-input-value';

export default function FormContainer() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(
    roleLogin.bind(null, '/admin/dashboard'),
    {
      email: fieldInputValue<string>(''),
      password: fieldInputValue<string>(''),
    } as LoginFormStateProps || {}
  );

  useEffect(() => {
    let { message } = state;

    if (message) {
      toast((props: ToastContentProps<unknown>) => {
        return (<div className='text-black'>{message}</div>)
      }, {
        toastId: `admin-login-success-${Date.now()}`,
        type: 'error',
        hideProgressBar: true,
      });
    }

  }, [state]);

  return (
    <>
      {state?.error! && <div className='bg-danger-light rounded px-4 py-2 text-white'>{state?.error!}</div>}
      <form action={formAction} ref={formRef} className='space-y-4'>
        <LoginForm state={state} role='admin' />
        <RememberMe role='admin' />
        <LoginButtons role='admin' />
      </form>
    </>
  )
}