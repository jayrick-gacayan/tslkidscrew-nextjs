import RegisterButtons from "./_sections/register-buttons";
import RegisterForm from "./_sections/register-form";

export default function Page() {
  return (
    <div className="flex items-center justify-center pt-12">
      <div className="w-[448px] m-auto block bg-white rounded p-8 shadow-lg space-y-8">
        <h1 className="text-center text-[24px]">Register to TSL Account</h1>
        <div className="space-y-4">
          <RegisterForm />
          <RegisterButtons />
        </div>
      </div>
    </div>
  )
}