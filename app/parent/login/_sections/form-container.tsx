'use client';

import { useFormState } from 'react-dom';


import LoginForm from '@/app/_components/login/login-form';
import { roleLogin } from '@/actions/auth-actions';
import LoginButtons from '@/app/_components/login/login-buttons';
import RememberMe from '@/app/_components/login/remember-me';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { fieldInputValue } from '@/types/helpers/field-input-value';
import { LoginFormStateProps } from '@/types/props/login-form-state-props';

export default function FormContainer() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(
    roleLogin.bind(null, '/admin/dashboard'),
    {
      email: fieldInputValue<string>(''),
      password: fieldInputValue<string>(''),
    } as LoginFormStateProps
  );

  return (
    <form action={formAction} ref={formRef} className='space-y-4'>
      <LoginForm state={state} role='parent' />
      <RememberMe role='parent' />
      <LoginButtons role='parent' />
    </form>
  )

}