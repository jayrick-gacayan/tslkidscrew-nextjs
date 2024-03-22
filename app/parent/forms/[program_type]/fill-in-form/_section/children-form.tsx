import InputCustom from '@/app/_components/input-custom';
import { ChangeEvent } from 'react';
import PopoverReactDayPicker from '@/app/_components/react-day-picker/popover-day-picker';
import { ChildInfoType } from '@/types/input-types/child-info-type';

export default function ChildrenForm({
  minimum_age,
  arrChildren,
  onChildrenRemoved,
  onChildrenAdded,
  onChildrenUpdated,
}: {
  minimum_age: number;
  arrChildren: ChildInfoType[];
  onChildrenRemoved: (idx: number) => void;
  onChildrenAdded: () => void;
  onChildrenUpdated: (idx: number, key: "first_name" | "last_name" | "birthdate" | "school_attending", value: string) => void;
}) {

  return (
    <div className='space-y-8'>
      <div className='space-y-2 text-black'>
        <h1 className='font-bold text-[36px]'>Child&#47;ren&#39;s Information</h1>
        <p>Accepting children {minimum_age} years old and up at this location.</p>
      </div>
      <div className='w-full h-auto space-y-10'>
        {

          arrChildren.map((value: ChildInfoType, idx: number) => {
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
                        name={`children[][firstname]`}
                        type='text'
                        className='bg-secondary p-4 border-transparent'
                        placeholder='First Name:'
                        value={value.first_name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          onChildrenUpdated(idx, 'first_name', e.target.value);
                        }} />
                      <InputCustom name='children[][lastname]'
                        type='text'
                        className='bg-secondary p-4 border-transparent'
                        placeholder='Last Name:'
                        value={value.last_name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          onChildrenUpdated(idx, 'last_name', e.target.value);
                        }} />
                    </div>
                    <div className='relative w-full'>
                      <div className='relative space-y-1'>
                        <div className='font-medium'>Start Date</div>
                        <div className='relative w-full'>
                          <PopoverReactDayPicker placeholder='Enter date'
                            selected={value.birthdate ? new Date(value.birthdate) : undefined}
                            inputName='children[][birthdate]'
                            options={{
                              mode: 'single',
                              selected: value.birthdate ? new Date(value.birthdate) : undefined,
                              onSelect: (value: any) => {
                                onChildrenUpdated(idx, 'birthdate', value.toISOString());
                              },
                              today: value.birthdate ? new Date(value.birthdate) : undefined,
                            }} />
                        </div>
                      </div>
                    </div>
                    <InputCustom labelText='School Attending'
                      id={`children-school-attending-${idx}`}
                      name='children[][school-attending]'
                      type='text'
                      className='bg-secondary p-4 border-transparent'
                      placeholder='School Attending:'
                      value={value.school_attending}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        onChildrenUpdated(idx, 'school_attending', e.target.value);
                      }} />
                  </div>
                </div>
                {
                  idx + 1 === arrChildren.length &&
                  (
                    <div onClick={onChildrenAdded}>
                      <button type='button'
                        className='p-3 text-white w-full rounded bg-primary'>Add Child</button>
                    </div>
                  )
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}