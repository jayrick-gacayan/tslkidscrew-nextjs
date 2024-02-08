'use client';

import { useFormState } from "react-dom";
import { parentLogin } from "../_actions/login-actions";
import LoginButtons from "./login-buttons";
import LoginForm from "./login-form";
import RememberMe from "./remember-me";

export default function FormContainer() {
  const [state, formAction] = useFormState(parentLogin, {} as any)

  return (
    <form action={formAction} className="space-y-4">
      <LoginForm />
      <RememberMe />
      <LoginButtons />
    </form>
  )

}