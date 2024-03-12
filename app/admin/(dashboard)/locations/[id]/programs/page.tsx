import ProgramsHeader from './_sections/programs-header';
import ProgramsTable from './_sections/programs-table';
import BackButtonClient from '../../../../../_components/back-button-client';
import Pagination from '@/app/_components/pagination';
import type { Metadata } from 'next';
import { redirectToPath } from '@/actions/common-actions';
import { LocationProgram } from '@/models/location-program';
import { Paginate } from '@/models/paginate';
import { Result } from '@/models/result';
import { SearchParamsProps } from '@/types/props/search-params-props';
import { locationProgramsAction } from '@/actions/location-program-actions';

export const metadata: Metadata = {
  title: 'Location Programs',
  description: 'Location Programs Page'
}

export default async function Page({
  params,
  searchParams
}: {
  params: { id: string }
  searchParams: SearchParamsProps;
}) {
  let result: Result<Paginate<LocationProgram>> = await locationProgramsAction(params.id, searchParams);
  let showEntry: number = typeof searchParams.per_page === 'string' ? parseInt(searchParams.per_page) : 10;
  let data: LocationProgram[] | undefined = result.data?.data;
  let totalPages: number = Math.ceil((result?.data?.total ?? 1) / showEntry) ?? 1;

  return (
    <div className="pb-6">
      <div className='rounded bg-white drop-shadow-lg p-4 space-y-6'>
        <BackButtonClient />
        <ProgramsHeader location_id={params.id}
          searchParams={searchParams}
          showEntry={showEntry}
          redirectURL={redirectToPath} />
        <ProgramsTable location_id={params.id} locationPrograms={data} />
        {
          (!data || totalPages < 2) ? null :
            (
              <div className='w-fit m-auto block'>
                <Pagination baseURL={`/admin/locations/${params.id}/programs`}
                  currentPage={typeof searchParams.page === 'string' ? searchParams.page : undefined}
                  searchParams={searchParams}
                  totalPages={totalPages} />
              </div>
            )
        }
      </div>
    </div>
  )
}