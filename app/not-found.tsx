import Link from 'next/link'
import { headers } from 'next/headers'

export default async function NotFound() {
  const headersList = headers()
  const domain = headersList.get('host')
  return (
    <div className='fixed h-screen w-screen top-0 left-0 bg-white'>
      <div className='flex items-center justify-center h-full w-full'>
        <div>
          <h1 className='text-black text-[40px]'>Not Found</h1>
        </div>
      </div>
    </div>
  )
}