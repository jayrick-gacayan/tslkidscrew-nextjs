'use client';

import { useFormState } from "react-dom";
import { adminLogin } from "../_actions/login-actions";
import LoginButtons from "./login-buttons";
import RememberMe from "./remember-me";
import LoginForm from "@/app/_components/login/login-form";
import { FormEvent, useRef } from "react";
import { z } from 'zod';

export default function FormContainer() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(adminLogin, {} as any);

  function validate(inputField: HTMLInputElement, schema: z.ZodString) {
    const validation = schema.safeParse(inputField.value);
    inputField.setCustomValidity(!validation.success ? 'Have error on input' : '');
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let form = event.target as HTMLFormElement;
    let formData = new FormData(form);

    await adminLogin(formData);
    // console.log("email", email.value);
    // console.log("password", password.value);
    // if (formRef.current) {
    //   const emailInput = formRef.current['email'] as HTMLInputElement;
    //   const passwordInput = formRef.current['password'] as HTMLInputElement;

    //   const emailSchema = z.string().min(1).email();
    //   const passwordSchema = z.string().min(1);

    //   validate(emailInput, emailSchema);
    //   validate(passwordInput, passwordSchema);



    // }

    // if (formRef.current?.checkValidity()) {


    // }



  }

  return (
    <form ref={formRef} className="space-y-4"
      onSubmit={onSubmit}>
      <LoginForm />
      <RememberMe />
      <LoginButtons />
    </form>
  )
}