'use client';

import ShowEntriesSelect from '@/app/_components/show-entries-select';
import { SearchParamsProps } from '@/types/props/search-params-props';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';

export default function InvoicesHeader({
  showEntry,
  searchParams,
}: {
  searchParams: SearchParamsProps;
  showEntry: number;
}) {
  const router: AppRouterInstance = useRouter();
  let baseURL: string = '/parent/invoices';

  function urlPaginate(searchParams: SearchParamsProps, per_page?: number) {
    let urlSearchParams = new URLSearchParams(Object.entries(searchParams) as string[][])

    if (urlSearchParams.has('page')) { urlSearchParams.delete('page'); }
    if (!per_page) { urlSearchParams.delete('per_page'); }
    else {
      urlSearchParams.set(
        encodeURIComponent('per_page'),
        encodeURIComponent(per_page)
      );
    }

    return `${baseURL}${urlSearchParams.toString() === '' ? '' : `?${urlSearchParams.toString()}`}`
  }

  return (
    <div className='flex sm:flex-row flex-col gap-4 items-start sm:items-center justify-between'>
      <div className='flex-1 text-black'>
        <h1 className='font-medium text-[24px]'>My Invoices</h1>
      </div>
      <div className='flex-none sm:w-auto w-full'>
        <ShowEntriesSelect value={showEntry} items={[10, 20, 30]}
          onChange={(value) => {
            router.replace(urlPaginate(searchParams, value === 10 ? undefined : value));
          }} />
      </div>
    </div>
  )
}