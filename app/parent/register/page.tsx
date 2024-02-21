import RegisterForm from "./_sections/register-form";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  description: 'Parent Register Page'
}


export default function Page() {
  return (
    <div className="flex items-center justify-center pt-12">
      <div className="w-[448px] m-auto block bg-white rounded p-8 shadow-lg space-y-8">
        <h1 className="text-center text-[24px]">Register to TSL Account</h1>
        <div className="space-y-4">
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}