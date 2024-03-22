import AdminUsersHeader from './_sections/admin-users-header';
import AdminUsersTable from './_sections/admin-users-table';
import type { Metadata } from 'next';
import { SearchParamsProps } from '@/types/props/search-params-props';
import Pagination from '@/app/_components/pagination';
import { Admin } from '@/models/admin';
import { Paginate } from '@/models/paginate';
import { Result } from '@/models/result';
import { Suspense } from 'react';
import { adminUsersAction } from '@/actions/admin-actions';

export const metadata: Metadata = {
  title: 'Admin Users',
  description: 'Admin Users Page'
}

export default async function Page({ searchParams }: { searchParams: SearchParamsProps }) {
  let result: Result<Paginate<Admin>> = await adminUsersAction(searchParams);
  let showEntry: number = typeof searchParams.per_page === 'string' ? parseInt(searchParams.per_page) : 10;
  let totalPages: number = Math.ceil((result?.data?.total ?? 1) / showEntry) ?? 1;
  let data: Admin[] | undefined = result.data?.data;

  return (
    <div className='rounded bg-white drop-shadow-lg py-4 px-8 space-y-6 relative'>
      <AdminUsersHeader searchParams={searchParams} showEntry={showEntry} />
      <Suspense fallback={<div>Loading....</div>}>
        <AdminUsersTable admins={data} />
      </Suspense>
      {
        (!data || totalPages < 2) ? null :
          (
            <div className='w-fit m-auto block'>
              <Pagination baseURL='/admin/admin-users'
                currentPage={typeof searchParams.page === 'string' ? searchParams.page : undefined}
                searchParams={searchParams}
                totalPages={totalPages} />
            </div>
          )
      }
    </div>
  );
}