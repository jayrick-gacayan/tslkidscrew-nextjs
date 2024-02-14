import type { Metadata } from "next";
import FormContainer from "./_sections/form-container";
import { adminLogin } from "./_actions/login-actions";

export const metadata: Metadata = {
  title: 'Admin Login',
  description: 'Admin Login Page'
}

export default async function Page() {

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-[448px] m-auto block bg-white rounded p-8 shadow-lg space-y-4">
        <h1 className="text-[24px] font-medium">Admin Account Login</h1>
        <FormContainer />
      </div>
    </div>
  )
}