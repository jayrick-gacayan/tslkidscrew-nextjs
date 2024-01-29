import LoginForm from "./_sections/login-form";
import RememberMe from "./_sections/remember-me";
import LoginButtons from "./_sections/login-buttons";

export default function Page() {
  return (
    <div className="flex items-center justify-center pt-12">
      <div className="w-[448px] m-auto block bg-white rounded p-8 shadow-lg">
        <h1 className="text-center text-[24px]">Login</h1>
        <div className="space-y-4">
          <LoginForm />
          <RememberMe />
          <LoginButtons />
        </div>
      </div>
    </div>
  )
}