'use client';

import CustomCheckbox from "@/app/_components/custom-checkbox";

export default function PaymentFormSummerCamp() {
  return (
    <div className="space-y-2">
      <CustomCheckbox value={false}
        onChange={(value: boolean) => { return; }}
        text=' I understand I am paying a $200 deposit that goes toward my first week of camp and is only refundable if cancellation of program is made by June 1.' />
      <CustomCheckbox value={false}
        onChange={(value: boolean) => { return; }}
        text='I understand that I am paying an annual summer camp registration fee that is non-refundable from the date of enrollment.' />
      <CustomCheckbox value={false}
        onChange={(value: boolean) => { return; }}
        text=' I understand that if I pay for a promotional package that cancellations for reimbursement must be made by June 1 and that if I cancel after this date, refunds will not be issued.' />
      <CustomCheckbox value={false}
        onChange={(value: boolean) => { return; }}
        text='I understand that if I enroll prior to March 1 it is because I need 5 or more weeks of camp.' />
      <CustomCheckbox value={false}
        onChange={(value: boolean) => { return; }}
        text='I understand that my monthly invoice will not be pro-rated during months where there are vacation weeks, for random days of illness, injury that disallow the child from attending for less than a two week period, or emergency closings.' />
      <CustomCheckbox value={false}
        onChange={(value: boolean) => { return; }}
        text='I understand that I can make changes to my enrollment through June 1, including cancellation of weeks or requests for reimbursements, but that after June 1, my enrollment is binding unless my child has a long term illness or injury that makes participation in camp not possible (long term is defined as more than a week), or my child is removed from camp due to not being able to meet his or her care needs. And for enrollments made after June 1, I have five business days to cancel my registration until all other terms become binding.' />
      <CustomCheckbox value={false}
        onChange={(value: boolean) => { return; }}
        text=' I understand that it is my obligation to conduct appropriate and advanced research on the TSL camp program by requesting a tour, asking questions through email or phone call, learning more about what a day camp entails, what special care needs we can and cannot address, what transitional challenges your child might have, how many children are typical at a given location and any and other information you may need to make an informed decision about the appropriateness of the TSL camp setting for you and your child and that making this determination without having done appropriate research after the first few days of camp and attempting to cancel and rescind your registration as a result, will not be fiscally indulged.' />
      <CustomCheckbox value={false}
        onChange={(value: boolean) => { return; }}
        text='I understand that TSL does not have to indulge cancellations due to ANY reason outside of the two stipulations referenced above and that any unpaid balances can and will be submitted to a collections agency as follow up.' />
      <CustomCheckbox value={false}
        onChange={(value: boolean) => { return; }}
        text="I understand that my invoices will not be pro-rated for general illness, even if the child misses several days in a given week due to that illness." />
    </div>
  )
}