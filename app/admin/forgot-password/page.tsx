import ForgotPasswordFormContainer from "./_sections/form-container";

export default function ForgotPassword() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-[448px] m-auto block bg-white rounded p-8 shadow-lg space-y-4">
        <h1 className="text-[24px] font-medium">Forgot Password</h1>
        <ForgotPasswordFormContainer />
      </div>
    </div>
  )
}