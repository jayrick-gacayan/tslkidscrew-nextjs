'use client';

import Fa6SolidEnvelope from "@/app/_components/svg/fa6-solid-envelope";
import { Tab } from "@headlessui/react";
import InputCustom from "@/app/_components/input-custom";
import Fa6SolidLock from "@/app/_components/svg/fa6-solid-lock";

export default function LoginDetails() {
  return (
    <Tab.Panel as='div' className="space-y-8">
      <h1 className="text-[32px] font-medium">Login Details</h1>
      <div className="space-y-4">
        <InputCustom labelText="Email"
          id="email-address"
          name="email-address"
          className="bg-secondary p-2 pl-10 border-transparent"
          placeholder="Email Address:"
          type="text"
          prefixIcon={<PrefixEnvelopeIcon />} />
        <InputCustom labelText="Password"
          id="password"
          name="password"
          className="bg-secondary p-2 pl-10 border-transparent"
          placeholder="Password:"
          type="text"
          prefixIcon={<PrefixLockIcon />} />
        <InputCustom labelText="Confirm Password"
          id="password-confirmation"
          name="password-confirmation"
          className="bg-secondary p-2 pl-10 border-transparent"
          placeholder="Confirm Password:"
          type="text"
          prefixIcon={<PrefixLockIcon />} />
      </div>
      <div className="w-fit ml-auto block space-x-4">
        <button className="p-2 text-white border border-primary rounded bg-primary">
          Save Changes
        </button>
      </div>
    </Tab.Panel>
  )
}

/* Prefix icons */
const PrefixEnvelopeIcon = () => {
  return (<Fa6SolidEnvelope className="text-warning absolute left-3 z-20 top-3 block peer-invalid:text-danger" />);
}

const PrefixLockIcon = () => {
  return (<Fa6SolidLock className="text-warning absolute left-3 z-20 top-3 block peer-invalid:text-danger" />);
}
