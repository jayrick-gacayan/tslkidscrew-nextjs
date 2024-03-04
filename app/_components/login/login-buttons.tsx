import Link from "next/link";
import { useFormStatus } from "react-dom";
import Spinners3DotsScale from "../svg/spinners3-dots-scale";

export default function LoginButtons({ role }: { role: string }) {
  const { pending } = useFormStatus();

  return (
    <div className="w-full flex justify-between items-center">
      <button type="submit"
        disabled={pending}
        className="bg-primary px-4 py-2 w-fit text-white rounded-sm disabled:cursor-not-allowed">
        {pending ? <><Spinners3DotsScale className="text-white text-[24px] inline-block mr-1" />Checking</> : 'Login'}
      </button>
      <Link href={`/${role}/forgot-password`}
        className="text-primary hover:underline font-medium">
        Forgot Password
      </Link>
    </div>
  )
}