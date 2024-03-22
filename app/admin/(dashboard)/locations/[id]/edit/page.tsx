import type { Metadata } from 'next';
import EditFormLocationContainer from './_sections/edit-location-form-container';
import BackButtonClient from '@/app/_components/back-button-client';

export const metadata: Metadata = {
  title: 'Edit Location',
  description: 'Edit Location Page'
}

export default function Page({ params }: { params: { id: string; } }) {

  return (
    <div className='p-8'>
      <div className='w-full lg:w-6/12 m-auto block space-y-8'>
        <BackButtonClient />
        <h1 className='text-[32px] font-medium text-black'>Edit Location</h1>
        <EditFormLocationContainer id={params.id} />
      </div>
    </div>
  );
}