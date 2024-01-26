'use client';

import { useMemo } from "react";
import DashboardMenuLink from "../_components/dashboard-menu-link";
import { useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation";
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Sidebar() {
  let segment = useSelectedLayoutSegment();

  const memoSegment = useMemo(() => { return segment ?? '' }, [segment]);

  return (
    <div className="drawer-side absolute top-0 left-0">
      <label htmlFor="admin-drawer" aria-label="close sidebar" className="drawer-overlay z-50" />
      <div className="w-64 min-h-full bg-primary text-white flex flex-col pt-8 relative z-[60]">
        {/* Sidebar content here */}
        <div className="flex-1">
          <Link href='/'
            className="m-auto block h-[72px] w-[144px] relative"
            aria-label="Brand">
            <Image alt="tsl-kids-crew-logo"
              fill
              src='/static/tsl-kids-crew-logo-white.png'
              sizes="100vw" />
          </Link>

          <nav className="w-full py-4">
            <DashboardMenuLink href='/admin/dashboard'
              altText='dashboard'
              current={memoSegment}
              text='Dashboard'
            />
            <DashboardMenuLink href='/admin/admin-users'
              altText='admin-users'
              current={memoSegment}
              text='Admin Users'
            />
            <DashboardMenuLink href='/admin/locations'
              altText='locations'
              current={memoSegment}
              text='Locations'
            />
          </nav>
        </div>
        <div className="flex-none">
          <nav className="w-full py-4">
            <DashboardMenuLink href='/admin/settings'
              altText='settings'
              current={memoSegment}
              text='Settings'
              icon={
                <span className="align-middle inline-block">
                  <Icon icon='fa6-solid:gear' fontSize={20} />
                </span>
              }
            />
            <DashboardMenuLink href={`#`}
              altText='logout'
              current={memoSegment}
              text='Logout'
              icon={
                <span className="align-middle inline-block">
                  <Icon icon='fe:logout' fontSize={20} />
                </span>
              }
            />

          </nav>
        </div>
      </div>
    </div>
  )
  return (
    <div className="drawer-side relative">
      <label htmlFor="admin-drawer" aria-label="close sidebar" className="drawer-overlay" />

      {/* Sidebar content here */}
      <ul className="menu flex flex-col h-screen justify-between bg-primary text-white w-64 pt-8">

      </ul>
    </div>
  )
}