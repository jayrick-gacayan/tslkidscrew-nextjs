'use client';

import { Montserrat } from "next/font/google";
import './globals.css';
import PhSmileyAngryFill from "./_components/svg/ph-smiley-angry-fill";
import SomethingWentWrong from "./_components/something-went-wrong";

const montserrat = Montserrat({
  subsets: ['latin'],
  style: [
    'normal',
    'italic'
  ],
  weight: [
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900'
  ],
  display: 'swap',
  fallback: [
    'system-ui',
    'arial'
  ],
})

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
  )
}