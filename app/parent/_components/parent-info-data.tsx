import { ReactNode } from 'react';

export default function ParentInfoData({
  labelText,
  data,
}: {
  labelText: string | ReactNode;
  data: string | ReactNode;
}) {
  return (
    <div className='space-x-3 block'>
      <span className='font-bold text-[24px] align-middle'>{labelText}</span>
      <span className='align-middle text-[20px]'>{data}</span>
    </div>
  )
}