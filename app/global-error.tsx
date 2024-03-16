'use client';

import SomethingWentWrong from "./_components/something-went-wrong";
import { montserrat } from "@/types/helpers/montserrat-font";
import './globals.css';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en" className='dark'>
      <body className={`${montserrat.className}`}>
        <div className='w-screen h-screen flex items-center justify-center'>
          <SomethingWentWrong reload={() => { window.location.reload(); }} />
        </div>
      </body>
    </html>
  );
}