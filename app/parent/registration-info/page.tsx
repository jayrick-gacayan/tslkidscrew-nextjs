import { getRegistrationRecordsAction } from '@/actions/registration-record-actions';
import RegistrationInfoHeader from './_sections/registration-info-header';
import RegistrationInfoTable from './_sections/registration-info-table';
import { Result } from '@/models/result';
import { Paginate } from '@/models/paginate';
import { SearchParamsProps } from '@/types/props/search-params-props';
import Pagination from '@/app/_components/pagination';
import { RegistrationRecord } from '@/models/registration-record';

export default async function Page({ searchParams }: { searchParams: SearchParamsProps }) {
  let result: Result<Paginate<RegistrationRecord>> = await getRegistrationRecordsAction();
  let showEntry: number = typeof searchParams.per_page === 'string' ? parseInt(searchParams.per_page) : 10;
  let totalPages: number = Math.ceil((result.data?.total ?? 1) / showEntry) ?? 1
  let data: any[] | undefined = result.data?.data;


  return (
    <div className='rounded bg-white drop-shadow-lg p-4 space-y-6'>
      <RegistrationInfoHeader showEntry={showEntry} searchParams={searchParams} />
      <RegistrationInfoTable registration_records={data} />
      {
        (!data || totalPages < 2) ? null :
          (
            <div className='w-fit m-auto block'>
              <Pagination baseURL='/parent/registration-info'
                currentPage={typeof searchParams.page === 'string' ? searchParams.page : undefined}
                searchParams={searchParams}
                totalPages={totalPages} />
            </div>
          )
      }
    </div>
  )
}