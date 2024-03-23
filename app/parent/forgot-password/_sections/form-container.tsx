'use client';

import InputCustom from '@/app/_components/input-custom';
import PasswordIcon from '@/app/_components/password-icon';
import { SearchParamsProps } from '@/types/props/search-params-props';
import Link from 'next/link';
import { ChangeEvent, useRef, useState } from 'react'

export default function ForgotPasswordFormContainer({ searchParams }: { searchParams: SearchParamsProps }) {
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [passwordConfirmationShow, setPasswordConfirmationShow] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} className='space-y-4'>
      {
        typeof searchParams.token === 'string' ?
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
          (<InputCustom labelText='Email'
            id='forgot-password-email'
            name='email'
            type='text'
            placeholder='Email Address:'
            onChange={(event: ChangeEvent<HTMLInputElement>) => { }}
            className='bg-secondary border-transparent p-2 px-3' />)
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