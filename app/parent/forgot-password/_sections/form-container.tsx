'use client';

import { forgotPasswordAction } from '@/actions/parent-info-actions';
import InputCustom from '@/app/_components/input-custom';
import PasswordIcon from '@/app/_components/password-icon';
import { SearchParamsProps } from '@/types/props/search-params-props';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom';
import { ToastContentProps, toast } from 'react-toastify';

export default function ForgotPasswordFormContainer({ searchParams }: { searchParams: SearchParamsProps }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, formAction] = useFormState(forgotPasswordAction, {} as any);
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [passwordConfirmationShow, setPasswordConfirmationShow] = useState<boolean>(false);


  useEffect(() => {
    if (formState?.message !== undefined && formState?.success !== undefined) {
      let { message, success } = formState;

      toast((props: ToastContentProps<unknown>) => {
        return (<div className='text-black'>{message}</div>);
      }, {
        toastId: `forgot-password-${Date.now()}`,
        type: success ? 'success' : 'error',
        hideProgressBar: true,
      });
    }
  }, [formState]);

  console.log('state', formState)

  return (
    <form ref={formRef} action={formAction} className='space-y-4'>
      {
        typeof searchParams.reset_password_token === 'string' ?
          (
            <>
              <InputCustom labelText='Password'
                id='forgot-password'
                name='password'
                placeholder='Password:'
                type={passwordShow ? 'text' : 'password'}
                suffixIcon={<PasswordIcon passwordShow={passwordShow} onPasswordShown={setPasswordShow} />}
                className='bg-secondary border-transparent p-2 px-3 pr-10' />
              <InputCustom labelText='Confirm Password'
                id='password-confirmation'
                name='confirm_password'
                placeholder='Confirm Password:'
                type={passwordConfirmationShow ? 'text' : 'password'}
                suffixIcon={<PasswordIcon passwordShow={passwordConfirmationShow} onPasswordShown={setPasswordConfirmationShow} />}
                className='bg-secondary border-transparent p-2 px-3 pr-10' />
            </>
          ) :
          (
            <InputCustom labelText='Email'
              id='forgot-password-email'
              name='email'
              type='text'
              placeholder='Email Address:'
              className='bg-secondary border-transparent p-2 px-3'
              errorText={formState?.email?.errorText}
              validationStatus={formState?.email?.validationStatus} />
          )
      }

      <button className='bg-primary p-2 rounded text-white w-auto m-auto block'>Submit</button>
      <div className='block space-y-1'>
        <p className='space-x-[2px]'>
          <span>Already have an account?</span>
          <Link href='/parent/login' className='text-primary hover:underline'>Login</Link>
        </p>
        <p className='space-x-[2px]'>
          <span>Do you have an account?</span>
          <Link href='/parent/register' className='text-primary hover:underline'>Register</Link>
        </p>
      </div>
    </form>
  )
}