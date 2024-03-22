import PopoverReactDayPicker from '@/app/_components/react-day-picker/popover-day-picker';
import { ChangeEvent } from 'react';
import { InputProps } from '@/types/props/input-props';
import WeekDaysBeforeAfterSchool from '../_components/week-days-before-after-school';

let today = new Date();

export default function RegistrationTypeSelectionBeforeOrAfterSchool({
  startDate,
  beforeSchool,
  afterSchool,
  errorText,
  onStartDateSelected,
  onCheckboxChanged,
}: {
  startDate: InputProps<string | undefined>;
  beforeSchool: any[];
  afterSchool: any[];
  errorText: string;
  onStartDateSelected: (val: string) => void;
  onCheckboxChanged: (key: 'beforeSchool' | 'afterSchool', arrSchool: any[], value: string) => void;
}) {

  function handleCheckboxChange(key: 'beforeSchool' | 'afterSchool', arrSchool: any[]): (e: ChangeEvent<HTMLInputElement>) => void {
    return function (e: ChangeEvent<HTMLInputElement>) {
      onCheckboxChanged(key, arrSchool, e.target.value);
    }
  }

  return (
    <div className='space-y-8'>
      <h1 className='font-bold text-[36px]'>Registration Type Selection</h1>
      <div className='space-y-6'>
        <div className='relative space-y-1'>
          <div className='font-medium'>Start Date</div>
          <div className='relative w-full'>
            <PopoverReactDayPicker selected={startDate.value ? new Date(startDate.value) : undefined}
              placeholder='Enter date'
              inputName='before-or-after-registration-start-date'
              options={{
                mode: 'single',
                selected: startDate.value ? new Date(startDate.value) : undefined,
                onSelect: (date: any) => { onStartDateSelected(date.toISOString()); },
                today: today,
              }} />
          </div>
        </div>
        <div className='space-y-6'>
          <div className='text-tertiary font-semibold text-[20px]'>BEFORE AND AFTER SCHOOL INFORMATION</div>
          <div className='italic text-danger font-medium'>&#42; Select at least 3 Week Days to continue with your registration.</div>
          <div className='flex lg:flex-row flex-col gap-2'>
            <WeekDaysBeforeAfterSchool keyString={'beforeSchool'}
              arrWeekDays={beforeSchool}
              onCheckboxChanged={handleCheckboxChange} />
            <WeekDaysBeforeAfterSchool keyString={'afterSchool'}
              arrWeekDays={afterSchool}
              onCheckboxChanged={handleCheckboxChange} />
          </div>
          {errorText !== '' && (<div className='text-danger'>{errorText}</div>)}
        </div>
      </div>
    </div>
  )
}