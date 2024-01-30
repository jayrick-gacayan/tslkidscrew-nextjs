'use client';

import CustomCheckbox from "@/app/_components/custom-checkbox";

export default function RegistrationTypeSelectionBeforeOrAfterSchool() {
  return (
    <div className="space-y-8">
      <h1 className="font-medium text-[36px]">Registration Type Selection</h1>
      <div className="space-y-4">
        <div className='block'>
          <h4 className="font-medium">Before School:</h4>
          <div className="flex items-center gap-4">
            <CustomCheckbox value={false} text='Monday' />
            <CustomCheckbox value={false} text='Tuesday' />
            <CustomCheckbox value={false} text='Wednesday' />
            <CustomCheckbox value={false} text='Thursday' />
            <CustomCheckbox value={false} text='Friday' />
          </div>
        </div>
        <div className='block'>
          <h4 className="font-medium">After School:</h4>
          <div className="flex items-center gap-4">
            <CustomCheckbox value={false} text='Monday' />
            <CustomCheckbox value={false} text='Tuesday' />
            <CustomCheckbox value={false} text='Wednesday' />
            <CustomCheckbox value={false} text='Thursday' />
            <CustomCheckbox value={false} text='Friday' />
          </div>
        </div>
      </div>
    </div>
  )
}