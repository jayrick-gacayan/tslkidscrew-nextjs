import { Paginate } from '@/models/paginate';
import { Result } from '@/models/result';
import { SearchParamsProps } from '@/types/props/search-params-props';
import ReceiptHeader from './_sections/receipt-header';
import { Receipt } from '@/models/receipt';
import ReceiptInfoTable from './_sections/receipt-info-table';
import Pagination from '@/app/_components/pagination';
import { getAllCustomerReceiptsAction } from '@/actions/receipts-actions';

export default async function Page({ searchParams }: { searchParams: SearchParamsProps }) {
  let result: Result<Paginate<Receipt>> = await getAllCustomerReceiptsAction(searchParams);
  let showEntry: number = typeof searchParams.per_page === 'string' ? parseInt(searchParams.per_page) : 10;
  let totalPages: number = Math.ceil((result.data?.total ?? 1) / showEntry) ?? 1
  let data: Receipt[] | undefined = result.data?.data;

  return (
    <div className='rounded bg-white drop-shadow-lg py-4 px-8 space-y-6'>
      <ReceiptHeader showEntry={showEntry} searchParams={searchParams} />
      <ReceiptInfoTable receipts={data} />
      {
        (!data || totalPages < 2) ? null :
          (
            <div className='w-fit m-auto block'>
              <Pagination baseURL='/parent/receipts'
                currentPage={typeof searchParams.page === 'string' ? searchParams.page : undefined}
                searchParams={searchParams}
                totalPages={totalPages} />
            </div>
          )
      }
    </div>
  )
}