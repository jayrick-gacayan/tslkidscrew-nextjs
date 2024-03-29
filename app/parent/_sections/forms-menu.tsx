import { Fa6SolidChevronDown } from "@/app/_components/svg/fa6-solid-chevron-down"
import { SCHOOL_AGE_CARE_CAMP_PROGRAMS } from "@/types/constants/school-age-care-camp-programs"
import { Menu, Transition } from "@headlessui/react"
import Link from "next/link"
import { Fragment } from "react"

export default function FormsMenu({ pathname }: { pathname: string }) {
  return (
    <div className="w-full">
      <Menu as='div' className='relative'>
        {({ open, close }) => {
          return (
            <>
              <Menu.Button as="div"
                className="flex items-center gap-2 w-full cursor-pointer text-white  hover:text-primary-light/70">
                <Link href='/parent/forms' onClick={() => { close(); }}>Forms</Link>
                <Fa6SolidChevronDown className={`transition-all duration-200 ${open ? '-rotate-90' : 'rotate-0'}`} />
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
                            ({ close }) => {
                              return (
                                <div className='relative'>
                                  <Link href={`/parent/forms/${value.altText}`}
                                    className={`p-3 block w-full hover:bg-primary hover:text-white ${pathname.includes(value.altText) ? 'bg-primary text-white' : ''}`}
                                    onClick={() => { close() }}>
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
  )
}