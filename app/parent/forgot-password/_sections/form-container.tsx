'use client';

import InputCustom from "@/app/_components/input-custom";
import Link from "next/link";
import { ChangeEvent, useRef } from "react"

export default function ForgotPasswordFormContainer() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} className='space-y-4'>
      <InputCustom labelText="Email"
        id='forgot-password-email'
        name='email'
        type="text"
        placeholder="Email Address:"
        onChange={(event: ChangeEvent<HTMLInputElement>) => { }}
        className="bg-secondary border-transparent p-2 px-3" />
      <button className="bg-primary p-2 rounded text-white w-auto m-auto block">Reset Password</button>
      <div className="block space-y-1">
        <p className="space-x-[2px]">
          <span>Already have an account?</span>
          <Link href='/parent/login' className="text-primary hover:underline">Login</Link>
        </p>
        <p className="space-x-[2px]">
          <span>Do you have an account?</span>
          <Link href='/parent/register' className="text-primary hover:underline">Register</Link>
        </p>
      </div>
    </form>
  )
}