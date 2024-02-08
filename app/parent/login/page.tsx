import FormContainer from "./_sections/form-container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Admin Login',
  description: 'Admin Login Page'
}

export default function Page() {
  return (
    <div className="flex items-center justify-center pt-12">
      <div className="w-[448px] m-auto block bg-white rounded p-8 shadow-lg">
        <h1 className="text-center text-[24px]">Login</h1>
        <div className="space-y-4">
          <FormContainer />
        </div>
      </div>
    </div>
  )
}