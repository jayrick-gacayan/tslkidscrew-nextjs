'use client';

import Link from "next/link";

export default function LoginButtons() {
  return (
    <div className="w-full flex justify-between items-center">
      <button type="submit"
        className="bg-primary px-4 py-2 w-fit text-white rounded-sm">
        Log in</button>
      <Link href='#'
        className="text-primary hover:underline font-medium">
        Forgot Password
      </Link>
    </div>
  )
}