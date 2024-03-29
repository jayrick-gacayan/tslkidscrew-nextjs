'use client';

import { Tab } from "@headlessui/react";
import InputCustom from "@/app/_components/input-custom";
import Fa6SolidPhone from "@/app/_components/svg/fa6-solid-phone";
import Fa6SolidLocationDot from "@/app/_components/svg/fa6-solid-location-dot";

export default function PersonalDetails() {

  return (
    <Tab.Panel as='div' className="space-y-8">
      <h1 className="text-[32px] font-medium">Personal Details</h1>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <InputCustom labelText="Firstname"
            id="firstName"
            name="firstname"
            className="bg-secondary p-2 border-transparent"
            placeholder="Firstname:"
            type="text" />
          <InputCustom labelText="Lastname"
            id="lastName"
            name="lastname"
            className="bg-secondary p-2 border-transparent"
            placeholder="Lastname:"
            type="text" />
        </div>
      </div>

      <div className="space-y-4">
        <InputCustom labelText="Emergency Number"
          id="emergency-number"
          name="emergency-number"
          className="bg-secondary p-2 pl-10 border-transparent"
          placeholder="Emergency Number:"
          type="text"
          prefixIcon={<PrefixPhoneIcon />} />

        <InputCustom labelText="Phone Number"
          id="phone-number"
          name="phone-number"
          className="bg-secondary p-2 pl-10 border-transparent"
          placeholder="Phone Number:"
          type="text"
          prefixIcon={<PrefixPhoneIcon />} />
      </div>

      <div className="space-y-4">
        <h3 className="text-tertiary">LOCATION</h3>
        <InputCustom labelText="Address Line 1"
          id="address-line-one"
          name="address-line-one"
          className="bg-secondary p-2 pl-10 border-transparent"
          placeholder="Address Line 1:"
          type="text"
          prefixIcon={<PrefixLocationDotIcon />} />
        <InputCustom labelText="Address Line 2"
          id="address-line-two"
          name="address-line-two"
          className="bg-secondary p-2 pl-10 border-transparent"
          placeholder="Address Line 2:"
          type="text"
          prefixIcon={<PrefixLocationDotIcon />} />
        <InputCustom labelText="City"
          id="address-city"
          name="address-city"
          className="bg-secondary p-2 pl-10 border-transparent"
          placeholder="City:"
          type="text"
          prefixIcon={<PrefixLocationDotIcon />} />
        <InputCustom labelText="State"
          id="address-state"
          name="address-state"
          className="bg-secondary p-2 pl-10 border-transparent"
          placeholder="State:"
          type="text"
          prefixIcon={<PrefixLocationDotIcon />} />
        <InputCustom labelText="Zipcode"
          id="address-zipcode"
          name="address-zipcode"
          className="bg-secondary p-2 pl-10 border-transparent"
          placeholder="Zipcode:"
          type="text"
          inputMode="numeric"
          prefixIcon={<PrefixLocationDotIcon />} />
      </div>

      <div className="w-fit ml-auto block space-x-4">
        <button className="p-2 text-danger border border-danger rounded">
          Cancel my account
        </button>
        <button className="p-2 text-white border border-primary rounded bg-primary">
          Update
        </button>
      </div>
    </Tab.Panel>
  )
}

/* Prefix icons */
const PrefixPhoneIcon = () => {
  return (<Fa6SolidPhone className="text-warning absolute left-3 z-20 top-3 block peer-invalid:text-danger" />);
}

const PrefixLocationDotIcon = () => {
  return (<Fa6SolidLocationDot className="text-warning absolute left-3 z-20 top-3 block peer-invalid:text-danger" />);
}