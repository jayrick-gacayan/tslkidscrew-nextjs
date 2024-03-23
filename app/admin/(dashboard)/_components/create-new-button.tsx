import Link from 'next/link';
import { ReactNode } from 'react';

export default function CreateNewButton({ href, text }: { href: string; text: string | ReactNode; }) {
  return (
    <div className='w-full'>
      <Link href={href}
        className='rounded hover:bg-primary/70 text-white bg-primary px-4 py-2 text-sm block text-center'>
        {text}
      </Link>
    </div>
  )
}