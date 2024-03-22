import LocationsHeader from './_sections/locations-header';
import LocationsTable from './_sections/locations-table';
import { SearchParamsProps } from '@/types/props/search-params-props';
import type { Metadata } from 'next';
import Pagination from '@/app/_components/pagination';
import { Result } from '@/models/result';
import { LocationPlace } from '@/models/location-place';
import { Paginate } from '@/models/paginate';
import { locationPlacesAction } from '@/actions/location-actions';

export const metadata: Metadata = {
  title: 'Locations',
  description: 'Locations Page'
}

export default async function Page({ searchParams }: { searchParams: SearchParamsProps; }) {
  let result: Result<Paginate<LocationPlace>> = await locationPlacesAction(searchParams);
  let showEntry: number = typeof searchParams.per_page === 'string' ? parseInt(searchParams.per_page) : 10;
  let data: LocationPlace[] | undefined = result.data?.data;
  let totalPages: number = Math.ceil((result?.data?.total ?? 1) / showEntry) ?? 1;

  return (
    <div className='p-8 space-y-6'>
      <LocationsHeader searchParams={searchParams} showEntry={showEntry} />
      <LocationsTable locationPlaces={data} />
      {
        (!data || totalPages < 2) ? null :
          (
            <div className='w-fit m-auto block'>
              <Pagination baseURL='/admin/locations'
                currentPage={typeof searchParams.page === 'string' ? searchParams.page : undefined}
                searchParams={searchParams}
                totalPages={totalPages} />
            </div>
          )
      }
    </div>
  );
}