import InputCheckboxCustom from '@/app/_components/input-checkbox-custom'
import { WEEK_DAYS } from '@/types/constants/week-days'
import { capitalCase, kebabCase } from 'change-case';
import { ChangeEvent } from 'react';

export default function WeekDaysBeforeAfterSchool({
  keyString,
  arrWeekDays,
  onCheckboxChanged,
}: {
  keyString: 'beforeSchool' | 'afterSchool';
  arrWeekDays: any[];
  onCheckboxChanged: (key: 'beforeSchool' | 'afterSchool', arrSchool: any[]) => (e: ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div className='block space-y-2 w-full'>
      <h4 className='font-medium'>{capitalCase(keyString)}:</h4>
      <div className='flex flex-col items-start gap-4'>
        {
          WEEK_DAYS.map((val: string, idx: number) => {
            return (
              <InputCheckboxCustom key={`${kebabCase(keyString)}-${val}-${idx}`}
                labelText={val}
                id={`${kebabCase(keyString)}-${val.toLowerCase()}`}
                name={`${kebabCase(keyString)}[]`}
                checked={arrWeekDays.includes(val)}
                value={val}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  onCheckboxChanged(keyString, arrWeekDays)(event)
                }} />
            )
          })
        }
      </div>
    </div>
  );
}