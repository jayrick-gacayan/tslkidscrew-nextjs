import ForgotPasswordFormContainer from "./_sections/form-container";

export default function ForgotPassword() {
  return (
    <div className="flex items-center justify-center pt-12">
      <div className="w-[448px] m-auto block bg-white rounded p-8 shadow-lg space-y-4">
        <h1 className="text-[24px]">Forgot Password</h1>
        <div className="space-y-4">
          <ForgotPasswordFormContainer />
        </div>
      </div>
    </div>
  )
}