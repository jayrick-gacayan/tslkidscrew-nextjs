import BackButtonClient from '@/app/_components/back-button-client';
import type { Metadata } from 'next';
import NewFormLocationContainer from './_sections/new-form-location-container';

export const metadata: Metadata = {
  title: 'Create Location',
  description: 'Create Location Page'
}

export default function Page() {

  return (
    <div className='p-8'>
      <div className='w-full lg:w-6/12 m-auto block space-y-8'>
        <BackButtonClient />
        <h1 className='text-[32px] font-medium text-black'>New Location</h1>
        <NewFormLocationContainer />
      </div>
    </div>
  );
}