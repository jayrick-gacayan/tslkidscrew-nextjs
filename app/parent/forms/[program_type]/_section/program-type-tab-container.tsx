'use client';

import CustomTabItem from "@/app/_components/custom-tab-item";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import ProgramTypeAbout from "./program-type-about";
import ProgramTypePricing from "./program-type-pricing";
import ProgramTypeFAQ from "./program-type-faq";

export default function ProgramTypeTabContainer() {
  return (
    <Tab.Group as={Fragment}>
      <div className='space-y-8 w-full'>
        <div className='flex items-center flex-nowrap w-full'>
          <CustomTabItem labelText='About' />
          <CustomTabItem labelText='Pricing' />
          <CustomTabItem labelText='FAQs' />
        </div>
        <Tab.Panels as={Fragment}>
          <ProgramTypeAbout />
          <ProgramTypePricing />
          <ProgramTypeFAQ />
        </Tab.Panels>
      </div>
    </Tab.Group>
  )
}