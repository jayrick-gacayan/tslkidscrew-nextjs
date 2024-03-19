'use client';

import { Menu, Transition } from "@headlessui/react";
import { usePathname, } from "next/navigation";
import CompanyLogo from "@/app/_components/company-logo";
import FormsMenu from "./forms-menu";
import SettingsMenu from "./settings-menu";
import { Fa6SolidChevronDown } from "@/app/_components/svg/fa6-solid-chevron-down";
import Link from "next/link";
import LogoutButton from "@/app/_components/logout-button";
import { PARENT_PUBLIC_ROUTES } from "@/types/constants/page-routes";
import { Parent } from "@/models/parent";
import BillingsMenu from "./billings-menu";

export default function ParentHeader({ parent }: { parent: Parent }) {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 left-0 z-[20] bg-primary w-full">
      <div className="px-12 py-4 w-full">
        <div className="flex items-center justify-between gap-4 w-full">
          <div className="flex-1">
            <div className="w-fit">
              <CompanyLogo height={164} width={128} href="/parent/dashboard" />
            </div>
          </div>
          <div className="flex-none w-[368px]">
            <div className="flex items-center w-full gap-4 justify-end">
              {
                PARENT_PUBLIC_ROUTES.includes(pathname) ?
                  (
                    <>
                      <Link href='/parent/login'
                        className="text-white hover:text-primary-light/70">
                        Login
                      </Link>
                      <Link href='/parent/register'
                        className="text-white hover:text-primary-light/70">
                        Register
                      </Link>
                    </>
                  ) :
                  (
                    <>
                      {
                        (!!parent.first_name && !!parent.last_name) &&
                        (
                          <>
                            <FormsMenu pathname={pathname} />
                            <BillingsMenu pathname={pathname} />
                            <SettingsMenu pathname={pathname} />
                          </>
                        )
                      }
                      <div className="w-full">
                        <Menu as='div' className='relative'>
                          {({ open, close }) => {
                            return (
                              <>
                                <Menu.Button as="div"
                                  className="flex items-center gap-2 w-full cursor-pointer text-white">
                                  <div className="size-10 rounded-full bg-white inline-block" />
                                  <div>{parent?.first_name ?? parent.email}</div>
                                  <Fa6SolidChevronDown className={`transition-all duration-200 ${open ? '-rotate-90' : 'rotate-0'}`} />
                                </Menu.Button>
                                <Transition enter="transition duration-100 ease-out"
                                  enterFrom="transform scale-95 opacity-0"
                                  enterTo="transform scale-100 opacity-100"
                                  leave="transition duration-75 ease-out"
                                  leaveFrom="transform scale-100 opacity-100"
                                  leaveTo="transform scale-95 opacity-0">
                                  <div className='overflow-hidden border focus:border-tertiary absolute top-[110%] right-0 z-[100] bg-white drop-shadow-lg rounded w-48'>
                                    <Menu.Item as='div'
                                      className='px-3 py-2 cursor-pointer hover:bg-primary hover:text-white'>
                                      Profile
                                    </Menu.Item>
                                    <Menu.Item as='div'
                                      className='block'>
                                      <LogoutButton redirectTo='/parent/login' className="hover:bg-primary hover:text-white">
                                        Logout
                                      </LogoutButton>
                                    </Menu.Item>
                                  </div>
                                </Transition>
                              </>
                            )
                          }}
                        </Menu>
                      </div>
                    </>
                  )
              }
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}