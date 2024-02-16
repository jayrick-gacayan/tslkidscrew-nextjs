import Link from "next/link";
import { useFormStatus } from "react-dom";

export default function LoginButtons() {
  const { pending } = useFormStatus();

  return (
    <div className="w-full flex justify-between items-center">
      <button type="submit"
        disabled={pending}
        className="bg-primary px-4 py-2 w-fit text-white rounded-sm disabled:cursor-not-allowed">
        {pending ? '...Checking' : 'Login'}
      </button>
      <Link href='/admin/forgot-password'
        className="text-primary hover:underline font-medium">
        Forgot Password
      </Link>
    </div>
  )
}