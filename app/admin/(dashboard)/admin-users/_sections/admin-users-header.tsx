'use client';

import AdminHeaderWithEntries from '../../_components/admin-header-with-entries';
import ShowEntriesSelect from '../../../../_components/show-entries-select';
import { SearchParamsProps } from '@/types/props/search-params-props';
import { reduxStore } from '@/react-redux/redux-store';
import { modalFormOpened, modalFormTypeSet } from '../_redux/admin-users-slice';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export default function AdminUsersHeader({
  searchParams,
  showEntry,
}: {
  searchParams: SearchParamsProps;
  showEntry: number;
}) {
  const router: AppRouterInstance = useRouter();
  let baseURL: string = '/admin/admin-users';

  function urlPaginate(searchParams: SearchParamsProps, per_page?: number) {
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
    <AdminHeaderWithEntries headerText='Admin Users'>
      <div className='flex w-full sm:w-fit items-center gap-4'>
        <ShowEntriesSelect value={showEntry} items={[10, 20, 30]}
          onChange={(value: any) => {
            router.replace(urlPaginate(searchParams, value === 10 ? undefined : value));
          }} />
        <div className='w-full'>
          <button className='rounded text-white bg-primary px-4 py-2 text-sm text-center'
            onClick={() => {
              reduxStore.dispatch(modalFormOpened(true));
              reduxStore.dispatch(modalFormTypeSet('add'));
            }}>
            Add a New Admin User
          </button>
        </div>
      </div>
    </AdminHeaderWithEntries>
  );
}