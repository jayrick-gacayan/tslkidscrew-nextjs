'use client';

import { Fragment, useEffect, useMemo, useRef } from "react";
import DashboardMenuLink from "../_components/dashboard-menu-link";
import { useSelectedLayoutSegment } from "next/navigation";
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from "@iconify/react/dist/iconify.js";
import { Dialog, Transition } from "@headlessui/react";
import { useMediaQuery, useOnClickOutside, useWindowSize } from "usehooks-ts";

export default function Sidebar({
  drawerOpen,
  onDrawerOpen,
}: {
  drawerOpen: boolean;
  onDrawerOpen: (open: boolean) => void;
}) {
  const matches = useMediaQuery('(min-width: 1024px)');
  const drawerRef = useRef(null);
  let segment = useSelectedLayoutSegment();

  const { width } = useWindowSize();

  const memoSegment = useMemo(() => { return segment ?? '' }, [segment]);

  useEffect(() => {
    // if (width > 1024 && !drawerOpen) { onDrawerOpen(true) }
    if (width < 1024 && drawerOpen) { onDrawerOpen(false); }
  }, [width, drawerOpen]);

  useOnClickOutside(drawerRef, () => {
    if (width < 1024) { onDrawerOpen(false); }
  });

  return (
    <Transition appear={true} show={drawerOpen} as={Fragment}>
      <div className={`absolute h-screen z-[60]`}>
        <Transition.Child as={Fragment}
          enter="transition-opacity ease-in duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-30"
          entered="opacity-30"
          leave="transition-opacity ease-out duration-300"
          leaveFrom="opacity-30"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/30 z-0 lg:hidden block" />
        </Transition.Child>
        <Transition.Child as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full">
          <div ref={drawerRef}
            className="w-64 min-h-full bg-primary text-white flex flex-col relative pt-8 fix z-[60]">
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
        </Transition.Child>
      </div>
    </Transition>
  )
}