'use client';

import Link from 'next/link';
import { SearchParamsProps } from '@/types/props/search-params-props';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import AdminHeaderWithEntries from '../../_components/admin-header-with-entries';
import ShowEntriesSelect from '@/app/_components/show-entries-select';
import CreateNewButton from '../../_components/create-new-button';

export default function LocationsHeader({
  searchParams,
  showEntry,
}: {
  searchParams: SearchParamsProps;
  showEntry: number;
}) {
  const router: AppRouterInstance = useRouter();
  let baseURL: string = '/admin/locations';

  function urlPaginate(searchParams: SearchParamsProps, per_page?: number): string {
    let urlSearchParams: URLSearchParams = new URLSearchParams(Object.entries(searchParams) as string[][])

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
    <AdminHeaderWithEntries headerText='Locations'>
      <div className='flex w-full sm:w-fit items-center gap-4'>
        <ShowEntriesSelect value={showEntry} items={[10, 20, 30]}
          onChange={(value: any) => {
            router.replace(urlPaginate(searchParams, value === 10 ? undefined : value));
          }} />
        <CreateNewButton href='/admin/locations/new' text='Create a New Location' />
      </div>
    </AdminHeaderWithEntries>
  );
}