'use client';

import { useFormState } from "react-dom";
import { parentLogin } from "../_actions/login-actions";
import LoginButtons from "./login-buttons";
import RememberMe from "./remember-me";
import LoginForm from "@/app/_components/login/login-form";

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