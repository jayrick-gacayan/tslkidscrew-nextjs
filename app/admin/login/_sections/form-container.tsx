'use client';

import { useFormState } from "react-dom";
import { adminLogin } from "../_actions/login-actions";
import LoginButtons from "./login-buttons";
import RememberMe from "./remember-me";
import LoginForm from "@/app/_components/login/login-form";
import { useRef } from "react";


export default function FormContainer() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(adminLogin, {} as any);

  return (
    <>
      {state?.error! && <div className="bg-danger-light rounded px-4 py-2 text-white">{state?.error!}</div>}
      <form action={formAction} ref={formRef} className="space-y-4">
        <LoginForm state={state} />
        <RememberMe />
        <LoginButtons />
      </form>
    </>
  )
}