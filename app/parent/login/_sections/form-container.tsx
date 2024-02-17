'use client';

import { useFormState } from 'react-dom';


import LoginForm from '@/app/_components/login/login-form';
import { roleLogin } from '@/actions/auth-actions';
import LoginButtons from '@/app/_components/login/login-buttons';
import RememberMe from '@/app/_components/login/remember-me';

export default function FormContainer() {
  const [state, formAction] = useFormState(roleLogin.bind(null, '/parent/dashboard'), {} as any);

  return (
    <form action={formAction} className='space-y-4'>
      <LoginForm state={state} role='parent' />
      <RememberMe role='parent' />
      <LoginButtons role='parent' />
    </form>
  )

}