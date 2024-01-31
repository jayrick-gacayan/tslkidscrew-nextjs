'use client'

import { useRouter } from 'next/navigation'
import { PhSmileyXEyesBold } from './_components/svg/ph-smiley-x-eyes-bold';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className='fixed h-screen w-screen top-0 left-0 bg-white'>
      <div className='flex items-center justify-center h-full w-full'>
        <div className='space-y-4 rounded flex-none w-auto'>
          <div className='text-danger w-fit m-auto block'>
            <PhSmileyXEyesBold height={192} width={192} />
          </div>
          <div className='text-center space-y-2 font-semibold'>
            <h1 className='text-[48px]'>404</h1>
            <h1 className='text-[32px]'>Page Not Found</h1>
          </div>
          <div className='w-fit m-auto block space-x-2'>
            <button className='rounded p-2 bg-white text-primary hover:bg-secondary-light'
              onClick={() => { router.back(); }}>
              Go back to previous page
            </button>
            <button className='rounded p-2 bg-primary text-white'
              onClick={() => { router.push('/') }}>
              Go home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}