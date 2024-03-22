import { LocationPlace } from '@/models/location-place';
import { notFound } from 'next/navigation';
import { Result } from '@/models/result';
import { locationPlaceAction } from '@/actions/location-actions';
import Link from 'next/link';
import InfoContainer from '@/app/_components/info-container';

export default async function LocationInfoData({ id }: { id: string }) {
  let result: Result<LocationPlace> = await locationPlaceAction(id);

  if (!result.data) { notFound(); }

  let locationPlaceData: LocationPlace = result.data;

  return (
    <div className='bg-secondary p-6 space-y-6'>
      <div className='w-full lg:w-6/12 block space-y-6'>
        <InfoContainer label='Name' data={locationPlaceData?.name!} />
        <InfoContainer label='Address' data={locationPlaceData?.address!} />
        <InfoContainer label='Primary Director' data={locationPlaceData?.director?.email! ?? 'N/A'} />
        <InfoContainer label='Minimum Age For Children' data={locationPlaceData?.minimum_age!} />
        <InfoContainer label='Programs' data={locationPlaceData?.programs_count ?? 'N/A'} />
      </div>
      <div className='w-fit ml-auto block space-x-2'>
        <Link href={`/admin/locations/${id}/programs`}
          className='w-fit px-4 py-2 rounded bg-primary text-white'>
          View All Programs
        </Link>
        <Link href={`/admin/locations/${id}/edit`}
          className='w-fit px-4 py-2 rounded bg-primary text-white'>
          Edit Info
        </Link>
      </div>
    </div>
  );
}