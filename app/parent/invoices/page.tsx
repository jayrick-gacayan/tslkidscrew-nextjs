import { Invoice } from '@/models/invoice';
import { Paginate } from '@/models/paginate';
import { Result } from '@/models/result';
import InvoicesHeader from './_sections/invoices-header';
import { SearchParamsProps } from '@/types/props/search-params-props';
import InvoicesInfoTable from './_sections/invoices-info-table';
import { redirectToPath } from '@/actions/common-actions';
import Pagination from '@/app/_components/pagination';
import { getAllCustomerInvoicesAction } from '@/actions/invoices-actions';

export default async function Page({ searchParams }: { searchParams: SearchParamsProps }) {
  let result: Result<Paginate<Invoice>> = await getAllCustomerInvoicesAction(searchParams)
  let showEntry: number = typeof searchParams.per_page === 'string' ? parseInt(searchParams.per_page) : 10;
  let totalPages: number = Math.ceil((result.data?.total ?? 1) / showEntry) ?? 1
  let data: Invoice[] | undefined = result.data?.data;

  return (
    <div className='rounded bg-white drop-shadow-lg py-4 px-8 space-y-6'>
      <InvoicesHeader showEntry={showEntry} searchParams={searchParams} redirectURL={redirectToPath} />
      <InvoicesInfoTable invoices={data} />
      {
        (!data || totalPages < 2) ? null :
          (
            <div className='w-fit m-auto block'>
              <Pagination baseURL='/parent/invoices'
                currentPage={typeof searchParams.page === 'string' ? searchParams.page : undefined}
                searchParams={searchParams}
                totalPages={totalPages} />
            </div>
          )
      }
    </div>
  )
}