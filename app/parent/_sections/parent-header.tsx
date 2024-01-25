'use client';

import Link from "next/link";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { SCHOOL_AGE_CARE_CAMP_PROGRAMS } from "@/types/constants/school-age-care-camp-programs";
import { Fragment } from "react";
import { usePathname } from "next/navigation";

export default function ParentHeader() {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 left-0 z-[20] bg-primary w-full">
      <div className="px-12 py-4 w-full">
        <div className="flex items-center justify-between gap-4 w-full">
          <div className="flex-none lg:hidden">
            <label htmlFor="admin-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
          </div>
          <div className="flex-1">
            <Link href='/'
              className="block"
              aria-label="Brand">
              <Image alt="tsl-kids-crew-logo"
                src={`/static/tsl-kids-crew-logo-white.png`}
                width={128}
                height={64}
                className="h-[64px] w-[128px] " />
            </Link>
          </div>
          <div className="flex-none w-[368px]">

            <div className="flex items-center w-full gap-4">

              <div className="w-full">
                <Menu as='div' className='relative'>
                  {({ open, close }) => {
                    return (
                      <>
                        <Menu.Button as="div"
                          className="flex items-center gap-2 w-full cursor-pointer text-white">
                          <div>Forms</div>
                          <div>
                            <Icon icon='fa6-solid:chevron-down'
                              className={`transition-all duration-200 ${open ? '-rotate-90' : 'rotate-0'}`} />
                          </div>
                        </Menu.Button>
                        <Transition enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0">
                          <div className='text-black overflow-hidden border focus:border-tertiary absolute top-[115%] right-0 z-[100] bg-white drop-shadow-lg rounded w-72'>
                            {
                              SCHOOL_AGE_CARE_CAMP_PROGRAMS.map((value: any) => {
                                return (
                                  <Menu.Item as={Fragment} key={`forms-navbar-parent-${value.name}`}>
                                    {
                                      ({ active }) => {
                                        return (
                                          <div className='relative'>
                                            <Link href={`/parent/forms/${value.altText}`}
                                              className={`p-3 block w-full hover:bg-primary hover:text-white ${pathname.includes(value.altText) ? 'bg-primary text-white' : ''}`}>
                                              {value.name}
                                            </Link>
                                            {
                                              value.isDisabled && (
                                                <div className="p-3 w-full text-white bg-secondary-light cursor-not-allowed absolute top-0 left-0">
                                                  {value.name}
                                                </div>
                                              )
                                            }
                                          </div>
                                        )
                                      }
                                    }

                                  </Menu.Item>
                                )
                              })
                            }
                          </div>
                        </Transition>
                      </>
                    )
                  }}
                </Menu>
              </div>
              <div className="w-full text-white">Settings</div>
              <div className="w-full">
                <Menu as='div' className='relative'>
                  {({ open, close }) => {
                    return (
                      <>
                        <Menu.Button as="div"
                          className="flex items-center gap-2 w-full cursor-pointer text-white">
                          <div className="size-10 rounded-full bg-white inline-block" />
                          <div>Deanver</div>
                          <div>
                            <Icon icon='fa6-solid:chevron-down'
                              className={`transition-all duration-200 ${open ? '-rotate-90' : 'rotate-0'}`} />
                          </div>
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
                              className='px-3 py-2 cursor-pointer hover:bg-primary hover:text-white'
                              onClick={() => { close(); }}>
                              Logout
                            </Menu.Item>
                          </div>
                        </Transition>
                      </>
                    )
                  }}
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}