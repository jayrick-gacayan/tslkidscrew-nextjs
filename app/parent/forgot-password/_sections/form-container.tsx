'use client';

import { forgotPasswordEmailAction, forgotPasswordTokenAction } from '@/actions/parent-passwords-actions';
import InputCustom from '@/app/_components/input-custom';
import PasswordIcon from '@/app/_components/password-icon';
import { SearchParamsProps } from '@/types/props/search-params-props';
import Link from 'next/link';
import { useMemo, useRef, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom';
import PendingAction from '../../forms/[program_type]/fill-in-form/_components/pending-actions';
import Fa6SolidEnvelopeCircleCheck from '@/app/_components/svg/fa6-solid-envelope-circle-check';
import Fa6SolidSquareCheck from '@/app/_components/svg/fa6-solid-square-check';

function ForgotPasswordSubmit() {
  const { pending } = useFormStatus();

  return (
    <button className='bg-primary p-2 rounded text-white w-40 m-auto block hover:bg-primary/70'>
      {pending ? <PendingAction /> : 'Submit'}
    </button>
  );
}

export default function ForgotPasswordFormContainer({ searchParams }: { searchParams: SearchParamsProps }) {
  const formRef = useRef<HTMLFormElement>(null);
  const token: string = useMemo(() => {
    let password_token = searchParams.reset_password_token;

    return typeof password_token === 'string' && password_token !== '' ? password_token : '';
  }, [searchParams]);

  const [formState, formAction] = useFormState(
    token !== '' ? forgotPasswordTokenAction.bind(null, token) :
      forgotPasswordEmailAction, {} as any);
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [passwordConfirmationShow, setPasswordConfirmationShow] = useState<boolean>(false);

  return (formState?.success !== undefined && formState?.success) ?
    (
      <>
        {
          token !== '' ?
            (
              <div className='space-y-2'>
                <div className='w-fit m-auto block'>
                  <Fa6SolidSquareCheck className='text-success h-56 w-56' />
                </div>
                <div className='text-center space-y-2'>
                  <p className='font-semibold text-[32px]'>Successfully reset password.</p>
                  <p>You may now login your account.</p>
                  <Link href='/parent/login'
                    className='block m-auto p-2 rounded w-32 bg-primary text-white hover:bg-primary/70'>
                    Login
                  </Link>
                </div>
              </div>
            ) :
            (
              <div className='space-y-2'>
                <div className='w-fit m-auto block'>
                  <Fa6SolidEnvelopeCircleCheck className='text-success h-56 w-56' />
                </div>
                <div className='text-center space-y-2'>
                  <p className='font-semibold text-[32px]'>Successfully email message sent.</p>
                  <p>You can now check your email account to get the confirmation message.</p>
                </div>
              </div>
            )
        }
      </>
    ) :
    (
      <>
        <h1 className='font-semibold text-[24px]'>{token !== '' ? 'Reset' : 'Forgot'} Password</h1>
        <form ref={formRef} action={formAction} className='space-y-4 w-[512px]'>
          {
            token !== '' ?
              (
                <>
                  <InputCustom labelText='Password'
                    id='forgot-password'
                    name='password'
                    placeholder='Password:'
                    type={passwordShow ? 'text' : 'password'}
                    suffixIcon={<PasswordIcon passwordShow={passwordShow} onPasswordShown={setPasswordShow} />}
                    className='bg-secondary border-transparent p-2 px-3 pr-10'
                    errorText={formState?.password?.errorText}
                    validationStatus={formState?.password?.validationStatus} />
                  <InputCustom labelText='Confirm Password'
                    id='password-confirmation'
                    name='password_confirmation'
                    placeholder='Confirm Password:'
                    type={passwordConfirmationShow ? 'text' : 'password'}
                    suffixIcon={<PasswordIcon passwordShow={passwordConfirmationShow} onPasswordShown={setPasswordConfirmationShow} />}
                    className='bg-secondary border-transparent p-2 px-3 pr-10'
                    errorText={formState?.password_confirmation?.errorText}
                    validationStatus={formState?.password_confirmation?.validationStatus} />
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
          <ForgotPasswordSubmit />
        </form>
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
      </>
    );
}