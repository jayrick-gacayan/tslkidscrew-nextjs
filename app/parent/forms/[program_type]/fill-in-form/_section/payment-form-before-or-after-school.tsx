'use client';

import CustomCheckbox from "@/app/_components/custom-checkbox";

export default function PaymentFormBeforeOrAfterSchool() {
  return (
    <div className="space-y-2">
      <CustomCheckbox value={false}
        onChange={(value: boolean) => { return; }}
        text='I understand I am paying a $25 registration fee that does not go toward tuition.' />
      <CustomCheckbox value={false}
        onChange={(value: boolean) => { return; }}
        text='I understand that my payment is due on the 1 st of each month and that services may lapse if I do not pay on time.' />
      <CustomCheckbox value={false}
        onChange={(value: boolean) => { return; }}
        text='I understand that my payment will be deducted on the 2 nd of each month if I am on auto pay.' />
      <CustomCheckbox value={false}
        onChange={(value: boolean) => { return; }}
        text='I understand that if I do not pay by the 22 th of each month that a $5 per day late fee will be assessed on my monthly fee.' />
      <CustomCheckbox value={false}
        onChange={(value: boolean) => { return; }}
        text='I understand that my monthly invoice will not be pro-rated during months where there are vacation weeks, for random days of illness, injury that disallow the child from attending for less than a two week period, or emergency closings.' />
      <CustomCheckbox value={false}
        onChange={(value: boolean) => { return; }}
        text='I understand that if I vacate my spot with an open balance, that TSL has the right to pursue unpaid balances through collections, which includes reporting to the major credit bureaus.' />
      <CustomCheckbox value={false}
        onChange={(value: boolean) => { return; }}
        text='I agree that my child can attend an off-site park at those locations that require a foot commute to a designated and approved play space.' />
      <CustomCheckbox value={false}
        onChange={(value: boolean) => { return; }}
        text='I understand that I am paying a $100 deposit that will be used against my last month of service in June, or if proper service cancellation notice is given (see below).' />
      <CustomCheckbox value={false}
        onChange={(value: boolean) => { return; }}
        text="I understand that if cancelling services prior to June that my deposit will be applied only if notice was given in advance of that month's billing cycle. i.e. if your last month of service is November, we need to know about it by October 31." />
    </div>
  )
}