import { Fragment, useMemo, useRef } from "react";
import DashboardMenuLink from "../_components/dashboard-menu-link";
import { useSelectedLayoutSegment } from "next/navigation";
import { Transition } from "@headlessui/react";
import {
  useEventListener,
  useOnClickOutside,
  useWindowSize
} from "usehooks-ts";
import { capitalCase } from "change-case";
import CompanyLogo from "@/app/_components/company-logo";
import { Fa6SolidGear } from "@/app/_components/svg/fa6-solid-gear";
import { FeLogout } from "@/app/_components/svg/fe-logout";

export default function Sidebar({
  drawerOpen,
  onDrawerOpen,
}: {
  drawerOpen: boolean;
  onDrawerOpen: (open: boolean) => void;
}) {
  const drawerRef = useRef(null);
  let segment = useSelectedLayoutSegment();

  const { width } = useWindowSize();

  const memoSegment = useMemo(() => { return segment ?? '' }, [segment]);

  useEventListener('resize', () => {
    if (width <= 1024 && drawerOpen) { onDrawerOpen(false); }
    else if (width > 1024 && !drawerOpen) { onDrawerOpen(true); }
  })

  useOnClickOutside(drawerRef, () => {
    if (width <= 1024) { onDrawerOpen(false); }
  });

  const adminDashboardLinks = ['dashboard', 'admin-users', 'locations'];

  return (
    <Transition appear={true} show={drawerOpen} as={Fragment}>
      <div className={`fixed h-screen z-[60]`}>
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
            <div className="flex-1">
              <CompanyLogo height={72} width={144} href="/admin/dashboard" className="m-auto w-fit" />
              <nav className="w-full py-4">
                {
                  adminDashboardLinks.map((link: string) => {
                    return (
                      <DashboardMenuLink key={`admin-links-${link}`}
                        href={`/admin/${link}`}
                        altText={link}
                        current={memoSegment}
                        text={capitalCase(link)}
                      />
                    )
                  })
                }
              </nav>
            </div>
            <div className="flex-none">
              <nav className="w-full py-4">
                <DashboardMenuLink href='/admin/settings'
                  altText='settings'
                  current={memoSegment}
                  icon={<Fa6SolidGear className="text-[20px] align-middle inline-block" />}
                  text='Settings' />
                <DashboardMenuLink href={`#`}
                  altText='logout'
                  current={memoSegment}
                  icon={<FeLogout className="text-[20px] align-middle inline-block" />}
                  text='Logout' />
              </nav>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  )
}