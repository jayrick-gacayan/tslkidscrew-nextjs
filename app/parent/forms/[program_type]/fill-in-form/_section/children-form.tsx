import InputCustom from '@/app/_components/input-custom';
import { ChangeEvent } from 'react';
import PopoverReactDayPicker from '@/app/_components/react-day-picker/popover-day-picker';
import { ChildInputTypes } from '@/types/input-types/child-input-types';
import { InputProps } from '@/types/props/input-props';
import { fieldInputValue } from '@/types/helpers/field-input-value';

export default function ChildrenForm({
  minimum_age,
  arrChildren,
  onChildrenRemoved,
  onChildrenAdded,
  onChildrenUpdated,
  onChildrenBirthdateUpdated,
}: {
  minimum_age: number;
  arrChildren: ChildInputTypes[];
  onChildrenRemoved: (idx: number) => void;
  onChildrenAdded: () => void;
  onChildrenBirthdateUpdated: (idx: number, value: string) => void;
  onChildrenUpdated: (idx: number, key: 'first_name' | 'last_name' | 'school_attending', value: InputProps<string>) => void;
}) {

  function handleInputChanged(idx: number, key: 'first_name' | 'last_name' | 'school_attending') {
    return function (e: ChangeEvent<HTMLInputElement>) {
      onChildrenUpdated(idx, key, fieldInputValue(e.target.value));
    }
  }

  return (
    <div className='space-y-8'>
      <div className='space-y-2 text-black'>
        <h1 className='font-bold text-[36px]'>Child&#47;ren&#39;s Information</h1>
        <p>Accepting children {minimum_age} years old and up at this location.</p>
      </div>
      <div className='w-full h-auto space-y-10'>
        {
          arrChildren.map((value: ChildInputTypes, idx: number) => {
            return (
              <div key={`children_form_${idx}`}
                className='space-y-6 w-full h-auto'>
                <div className='p-4 relative rounded border border-secondary-light '>
                  {
                    arrChildren.length > 1 &&
                    (
                      <div className='absolute -top-4 -right-3 cursor-pointer bg-danger hover:bg-danger-light h-8 w-8 text-white rounded-full'
                        onClick={() => { onChildrenRemoved(idx); }}>
                        <span className='translate-x-3 translate-y-1 block'>x</span>
                      </div>
                    )
                  }
                  <div className='space-y-4'>
                    <div className='flex items-center gap-4'>
                      <InputCustom id={`children-firstname-${idx}`}
                        name={`children[][first_name]`}
                        labelText='First Name'
                        type='text'
                        className='bg-secondary p-4 border-transparent'
                        placeholder=''
                        value={value.first_name.value}
                        onChange={handleInputChanged(idx, 'first_name')}
                        errorText={value.first_name.errorText}
                        validationStatus={value.first_name.validationStatus} />
                      <InputCustom name='children[][last_name]'
                        type='text'
                        labelText='Last Name'
                        className='bg-secondary p-4 border-transparent'
                        placeholder=''
                        value={value.last_name.value}
                        onChange={handleInputChanged(idx, 'last_name')}
                        errorText={value.last_name.errorText}
                        validationStatus={value.last_name.validationStatus} />
                    </div>
                    <div className='relative w-full'>
                      <div className='relative space-y-1'>
                        <div className='font-medium'>Birth Date</div>
                        <div className='relative w-full'>
                          <PopoverReactDayPicker placeholder='Enter date'
                            selected={value.birthdate ? new Date(value.birthdate) : undefined}
                            inputName='children[][birthdate]'
                            options={{
                              mode: 'single',
                              selected: value.birthdate ? new Date(value.birthdate) : undefined,
                              onSelect: (value: any) => { onChildrenBirthdateUpdated(idx, value.toISOString()); },
                              today: value.birthdate ? new Date(value.birthdate) : undefined,
                            }} />
                        </div>
                      </div>
                    </div>
                    <InputCustom labelText='School Attending'
                      id={`children-school-attending-${idx}`}
                      name='children[][school_attending]'

                      type='text'
                      className='bg-secondary p-4 border-transparent'
                      placeholder=''
                      value={value.school_attending.value}
                      onChange={handleInputChanged(idx, 'school_attending')}
                      errorText={value.school_attending.errorText}
                      validationStatus={value.school_attending.validationStatus} />
                  </div>
                </div>
                {
                  idx + 1 === arrChildren.length &&
                  (
                    <div onClick={onChildrenAdded}>
                      <button type='button' className='p-3 text-white w-full rounded bg-primary'>Add Child</button>
                    </div>
                  )
                }
              </div>
            )
          })
        }
      </div>
    </div>
  );
}