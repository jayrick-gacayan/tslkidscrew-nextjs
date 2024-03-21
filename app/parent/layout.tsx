import { ReactNode } from 'react'
import ParentHeader from './_sections/parent-header';
import ParentBreadcrumbs from './_sections/parent-breadcrumbs';
import { Session } from 'next-auth';
import { auth } from '@/auth';

export default async function Layout({
  children
}: {
  children: ReactNode;
}) {
  let parent: Session | null = await auth();

  return (
    <div className='relative w-screen h-screen'>
      <ParentHeader parent={parent?.user!} />
      <div className='h-[calc(100vh-96px)] overflow-auto'>
        <div className='container mx-auto flex flex-col h-full gap-12 lg:px-0 px-4'>
          <ParentBreadcrumbs />
          {children}
        </div>
      </div>
    </div>
  )
}