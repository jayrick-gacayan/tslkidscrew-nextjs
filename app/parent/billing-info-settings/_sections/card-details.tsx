'use client';

import InputCustom from "@/app/_components/input-custom";
import Fa6SolidCalendar from "@/app/_components/svg/fa6-solid-calendar";
import Fa6SolidCreditCard from "@/app/_components/svg/fa6-solid-credit-card";
import Fa6SolidLock from "@/app/_components/svg/fa6-solid-lock";
import { Tab } from "@headlessui/react";

export default function CardDetails() {
  return (
    <Tab.Panel as='div' className="space-y-8">
      <div className="space-y-4">
        <InputCustom labelText="Card Number"
          id="card-details-card-number"
          name="card-details-card-number"
          className="bg-secondary p-2 pl-10 border-transparent"
          placeholder="Card Number:"
          type="text"
          prefixIcon={<PrefixCreditCardIcon />} />
        <div className="flex items-center gap-4">
          <InputCustom labelText="Date Expiry"
            id="card-details-expiry"
            name="card-details-expiry"
            className="bg-secondary p-2 pl-10 border-transparent"
            placeholder="Date Expiry:"
            type="month"
            prefixIcon={<PrefixCalendarIcon />} />
          <InputCustom labelText="CVC"
            id="card-details-cvc"
            name="card-details-cvc"
            className="bg-secondary p-2 pl-10 border-transparent"
            placeholder="CVC:"
            type="text"
            prefixIcon={<PrefixLockIcon />} />
        </div>
      </div>
      <div className="w-fit ml-auto block space-x-4">
        <button className="p-2 text-white border border-primary rounded bg-primary">
          Add Card
        </button>
      </div>
    </Tab.Panel>
  )
}

/* Prefix icons */
const PrefixCreditCardIcon = () => {
  return (<Fa6SolidCreditCard className="text-warning absolute left-3 z-20 top-3 block peer-invalid:text-danger" />);
}

const PrefixCalendarIcon = () => {
  return (<Fa6SolidCalendar className="text-warning absolute left-3 z-20 top-3 block peer-invalid:text-danger" />);
}

const PrefixLockIcon = () => {
  return (<Fa6SolidLock className="text-warning absolute left-3 z-20 top-3 block peer-invalid:text-danger" />);
}