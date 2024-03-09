import { LocationProgram } from '@/models/location-program';
import ProgramsTableClient from './programs-table-client';
import TableEmptyData from '@/app/_components/table-empty-data';
import SomethingWentWrongClient from '@/app/_components/table-something-went-wrong-client';

export default function ProgramsTable({
  location_id,
  locationPrograms
}: {
  location_id: string;
  locationPrograms: LocationProgram[] | undefined;
}) {
  return (
    <div className='block overflow-auto rounded bg-secondary min-h-[512px] h-full'>
      <table className={`min-w-[1024px] w-full 
      ${(!locationPrograms || locationPrograms.length === 0 || locationPrograms.length > 10) ? 'h-full min-h-[512px]' : 'h-auto'}`}>
        <thead>
          <tr className='bg-secondary-light [&>th]:text-sm [&>th]:font-medium [&>th]:px-3 [&>th]:py-2'>
            <th className='w-42'>NAME</th>
            <th className='w-auto'>NAME SUFFIX</th>
            <th className='w-72'>DIRECTOR</th>
            <th className='w-24'>STATUS</th>
            <th className='w-40'>CAPACITY</th>
            <th className='w-40'>ENROLLED</th>
            <th className='w-24'>ACTION</th>
          </tr>
        </thead>
        {
          !locationPrograms ? (<SomethingWentWrongClient />) :
            locationPrograms.length === 0 ? (<TableEmptyData />) :
              (<ProgramsTableClient location_id={location_id} programs={locationPrograms} />)
        }
      </table>
    </div>
  )
}