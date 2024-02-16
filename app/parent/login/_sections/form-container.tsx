'use client';

import { useFormState } from "react-dom";
import LoginButtons from "./login-buttons";
import RememberMe from "./remember-me";
import LoginForm from "@/app/_components/login/login-form";
import { roleLogin } from "@/actions/auth-actions";

export default function FormContainer() {
  const [state, formAction] = useFormState(roleLogin.bind(null, '/parent/dashboard'), {} as any);

  return (
    <form action={formAction} className="space-y-4">
      <LoginForm state={state} role='parent' />
      <RememberMe />
      <LoginButtons />
    </form>
  )

}