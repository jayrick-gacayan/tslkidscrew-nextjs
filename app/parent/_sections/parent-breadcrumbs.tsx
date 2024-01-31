'use client';

import { Fa6SolidChevronRight } from '@/app/_components/svg/fa6-solid-chevron-right';
import { capitalCase } from "change-case";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useCallback, useMemo } from "react";

export default function ParentBreadcrumbs() {
  const pathname = usePathname();

  let pathSegments = useMemo(() => {
    return pathname.substring(1, pathname.length).split('/');
  }, [pathname])

  const cbArrBreadCrumbs = useCallback(() => {
    let arraybc = [
      {
        altText: 'dashboard',
        text: 'Home',
        href: '/parent/dashboard'
      },
      {
        altText: pathSegments[1],
        text: pathname.includes('settings') ? 'Settings' : `${capitalCase(pathSegments[1])}`,
        href: `/parent/${pathSegments[1]}`
      },
    ];

    if (pathSegments.length > 2 && pathSegments[1] === 'forms') {
      if (pathSegments.length === 3) {
        arraybc.push({
          altText: pathSegments[2],
          href: `/parent/forms/${pathSegments[2]}`,
          text: capitalCase(pathSegments[2])
        })
      }
      else if (pathSegments.length === 4) {
        arraybc.push({
          altText: pathSegments[2],
          href: `/parent/forms/${pathSegments[2]}`,
          text: capitalCase(pathSegments[2])
        })

        arraybc.push({
          altText: pathSegments[3],
          href: `/parent/forms/${pathSegments[2]}/${pathSegments[3]}`,
          text: capitalCase(pathSegments[3])
        })
      }

    }
    return arraybc;
  }, [pathSegments]);

  return (
    pathname.includes('login') ||
    pathname.includes('register')) ? null :
    (
      <div className="flex flex-wrap items-center gap-2 pt-12">
        {
          cbArrBreadCrumbs().map((value: any, index: number) => {
            return (
              <Fragment key={`parent-breadcrumbs-${value.text}-${index}`}>
                <Link href={value.href}
                  className={`cursor-pointer block hover:underline 
                ${value.altText === cbArrBreadCrumbs()[cbArrBreadCrumbs().length - 1].altText ? 'text-primary' : ''}`}>
                  {value.text}
                </Link>
                {
                  index < cbArrBreadCrumbs().length - 1 &&
                  (
                    <Fa6SolidChevronRight className='block' />
                  )
                }
              </Fragment>
            )
          })
        }
      </div>
    )
}