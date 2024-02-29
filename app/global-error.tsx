'use client';

import { Montserrat } from "next/font/google";
import './globals.css';
import PhSmileyAngryFill from "./_components/svg/ph-smiley-angry-fill";

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
          <div className='space-y-4 rounded flex-none w-auto'>
            <div className='text-danger w-fit m-auto block'>
              <PhSmileyAngryFill height={192} width={192} />
            </div>
            <div className='text-center space-y-2 font-semibold'>
              <h1 className='text-[48px]'>Something went wrong!</h1>
            </div>
            <button className="w-auto p-2 block m-auto rounded bg-primary text-white"
              onClick={() => reset()}>Try again</button>
          </div>
        </div>
      </body>
    </html>
  )
}