import { ReactNode } from 'react';
import DrawerRoot from './_sections/drawer-root';
import { User } from 'next-auth';
import { currentAdminAction } from '@/actions/admin-actions';
import { Admin } from '@/models/admin';

export default async function Layout({ children }: { children: ReactNode }) {
  let admin: { user: Partial<User<Partial<Admin>>> } | undefined = await currentAdminAction();

  return (<DrawerRoot admin={admin?.user!}>{children}</DrawerRoot>);
}