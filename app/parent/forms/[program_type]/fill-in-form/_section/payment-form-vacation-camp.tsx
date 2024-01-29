'use client';

import CustomCheckbox from "@/app/_components/custom-checkbox";

export default function PaymentFormVacationCamp() {
  return (
    <div className="space-y-2">
      <CustomCheckbox value={false}
        onChange={(value: boolean) => { return; }}
        text='I understand that payment will be made in full at the time of registration.' />
      <CustomCheckbox value={false}
        onChange={(value: boolean) => { return; }}
        text=' I understand that if I cancel with less than 14 days notice of the program start date, that I will not receive a refund or credit.' />
      <CustomCheckbox value={false}
        onChange={(value: boolean) => { return; }}
        text='I waive all TSL liability for any accidental injury that occurs on site while during program hours.' />
      <CustomCheckbox value={false}
        onChange={(value: boolean) => { return; }}
        text='I agree that my child can attend an off-site park if enrolled at Sacred Heart, Clifton Park, Delmar, or Rotterdam.' />
    </div>
  );
}