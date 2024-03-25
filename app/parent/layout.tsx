import { ReactNode } from 'react'
import ParentHeader from './_sections/parent-header';
import ParentBreadcrumbs from './_sections/parent-breadcrumbs';
import { currentParentAction } from '@/actions/parent-info-actions';

export default async function Layout({ children }: { children: ReactNode; }) {
  let parent = await currentParentAction();

  return (
    <div className='relative min-h-screen min-w-full h-full w-full'>
      <ParentHeader parent={parent} />
      <div className='min-h-[calc(100vh-96px)] flex flex-col h-full overflow-auto'>
        <div className='container flex-1 mx-auto flex flex-col gap-12 lg:px-0 px-8 h-full'>
          <ParentBreadcrumbs />
          {children}
        </div>
      </div>
    </div>
  );
}