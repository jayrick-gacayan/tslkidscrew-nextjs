'use client';

import { Fa6SolidChevronDown } from "@/app/_components/svg/fa6-solid-chevron-down";
import { Menu, Transition } from "@headlessui/react";

export default function AdminHeader({
  onDrawerOpen
}: {
  onDrawerOpen: () => void;
}) {
  return (
    <div className="fixed top-0 left-0 z-50 lg:ps-64 bg-white w-full">
      <div className="flex justify-between lg:justify-end px-12 py-4 gap-4 w-full">
        <div className="flex-none lg:hidden self-center">
          <label className="flex-none lg:hidden h-16 w-16 border border-transparent bg-transparent cursor-pointer"
            onClick={onDrawerOpen}>
            <svg xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
        </div>
        <div>
          <Menu as='div' className='relative w-36'>
            {({ open, close }) => {
              return (
                <>
                  <Menu.Button as="div" className="flex items-center gap-2 w-full cursor-pointer">
                    <div className="size-10 rounded-full bg-primary inline-block" />
                    <div>Deanver</div>
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
  )
}