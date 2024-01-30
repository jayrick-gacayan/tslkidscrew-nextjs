import Link from "next/link";

export default function RegisterButtons() {
  return (
    <div className="w-full space-y-2">
      <button className="bg-primary px-4 py-2 w-fit text-white rounded ml-auto block">Register</button>
      <div>
        <span>Already have an account? </span>
        <Link href='/parent/login'
          className="text-primary hover:underline font-medium">
          Login
        </Link>
      </div>
    </div>
  )
}