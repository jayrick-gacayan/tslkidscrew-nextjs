'use client';

import { ReactNode, useState } from 'react';
import AdminHeader from './admin-header';
import Sidebar from './sidebar';
import { Admin } from '@/models/admin';
import { User } from 'next-auth';

export default function DrawerRoot({
  admin,
  children
}: {
  admin: Partial<User<Partial<Admin>>>;
  children: ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);

  return (
    <div className='relative min-h-screen min-w-full h-full w-full overflow-auto'>
      <AdminHeader admin={admin} onDrawerOpen={() => { setDrawerOpen(true); }} />
      <Sidebar drawerOpen={drawerOpen} onDrawerOpen={(open: boolean) => { setDrawerOpen(open); }} />
      <div className='w-full lg:ps-64 pt-12 h-full'>
        <div className='p-12 h-full'>
          <div className='relative rounded min-h-[calc(100vh-144px)] h-full bg-white drop-shadow-lg'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}