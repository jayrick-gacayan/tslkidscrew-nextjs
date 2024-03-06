'use client';

import AdminHeaderWithEntries from "../../_components/admin-header-with-entries";
import ShowEntriesSelect from "../../../../_components/show-entries-select";
import { SearchParamsProps } from "@/types/props/search-params-props";
import { useAdminUserHook } from "../_contexts/use-admin-user-hook";

export default function AdminUsersHeader({
  searchParams,
  showEntry,
  redirectURL,
}: {
  searchParams: SearchParamsProps;
  showEntry: number;
  redirectURL: (url: string) => Promise<void>
}) {
  const { modalOpen, modalType } = useAdminUserHook();
  let baseURL = "/admin/admin-users";

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
    <AdminHeaderWithEntries headerText='Admin Users'>
      <div className='flex w-full sm:w-fit items-center gap-4'>
        <ShowEntriesSelect value={showEntry} items={[10, 20, 30]}
          onChange={(value: any) => {
            redirectURL(urlPaginate(searchParams, value === 10 ? undefined : value));
          }} />
        <div className="w-full">
          <button className="rounded text-white bg-primary px-4 py-2 text-sm text-center"
            onClick={() => {
              modalOpen(true);
              modalType('add');
            }}>
            Add a New Admin User
          </button>
        </div>
      </div>
    </AdminHeaderWithEntries>
  )
}