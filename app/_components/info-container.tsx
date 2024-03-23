import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export default function InfoContainer({
  label,
  data,
  className
}: {
  label: string;
  data: string | ReactNode;
  className?: string;
}) {

  return (
    <div className={twMerge('flex sm:flex-row flex-col gap-2 w-full', className!)}>
      <div className='w-full font-semibold text-black'>{label}</div>
      <div className='w-full'>{data}</div>
    </div>
  );
}