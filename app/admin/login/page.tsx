import LoginForm from "./_sections/login-form";
import RememberMe from "./_sections/remember-me";
import LoginButtons from "./_sections/login-buttons";
import type { Metadata } from "next";
import { adminLogin } from "./_actions/login-actions";

export const metadata: Metadata = {
  title: 'Admin Login',
  description: 'Admin Login Page'
}

export default function Page() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-[448px] m-auto block bg-white rounded p-8 shadow-lg">
        <h1 className="text-center text-[24px]">Login</h1>
        <form action={adminLogin} className="space-y-4">
          <LoginForm />
          <RememberMe />
          <LoginButtons />
        </form>
      </div>
    </div>
  )
}