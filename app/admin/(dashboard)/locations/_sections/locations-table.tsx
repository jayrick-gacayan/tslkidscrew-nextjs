import { LocationPlace } from '@/models/location-place';
import LocationTableClient from './location-table-client';
import TableEmptyData from '@/app/_components/table-empty-data';
import SomethingWentWrongClient from '@/app/_components/table-something-went-wrong-client';

export default function LocationsTable({ locationPlaces }: { locationPlaces: LocationPlace[] | undefined }) {

  return (
    <div className='block overflow-auto rounded bg-secondary min-h-[512px] h-full'>
      <table className={`min-w-[1024px] w-full
        ${(!locationPlaces || locationPlaces.length === 0 || locationPlaces.length > 10) ? 'h-full min-h-[512px]' : 'h-auto'}`}>
        <thead>
          <tr className='bg-secondary-light [&>th]:text-sm [&>th]:font-medium [&>th]:px-3 [&>th]:py-2'>
            <th className='w-56'>NAME</th>
            <th className='w-auto'>ADDRESS</th>
            <th className='w-56'>PRIMARY DIRECTOR</th>
            <th className='w-24'>PROGRAMS COUNT</th>
            <th className='w-40'>MINIMUM AGE</th>
            <th className='w-24'>ACTION</th>
          </tr>
        </thead>
        {
          !locationPlaces ? (<SomethingWentWrongClient />) :
            locationPlaces.length === 0 ? (<TableEmptyData colSpan={6} />) :
              (<LocationTableClient locationPlaces={locationPlaces} />)
        }
      </table>
    </div>
  )
}