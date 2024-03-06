import { auth } from "@/auth"
import { Invoice } from "@/models/invoice";
import { Paginate } from "@/models/paginate";
import { Parent } from "@/models/parent";
import { Result } from "@/models/result";
import { getAllCustomerInvoices } from "@/services/invoice-services";
import { Session } from "next-auth";
import InvoicesHeader from "./_sections/invoices-header";
import { SearchParamsProps } from "@/types/props/search-params-props";
import InvoicesInfoTable from "./_sections/invoices-info-table";
import { redirectToPath } from "@/actions/common-actions";
import Pagination from "@/app/_components/pagination";

export default async function Page({ searchParams }: { searchParams: SearchParamsProps }) {
  let parent: Session<Parent> | null = await auth();
  let result: Result<Paginate<Invoice>> = await getAllCustomerInvoices(searchParams, parent?.accessToken!);

  let showEntry = typeof searchParams.per_page === 'string' ? parseInt(searchParams.per_page) : 10;
  let totalPages = Math.ceil((result.data?.total ?? 1) / showEntry) ?? 1
  let data = result.data?.data ?? [];

  console.log('data', data)
  return (
    <div className="rounded bg-white drop-shadow-lg py-4 px-8 space-y-6">
      <InvoicesHeader showEntry={showEntry} searchParams={searchParams} redirectURL={redirectToPath} />
      <InvoicesInfoTable invoices={data} />
      {
        totalPages < 2 ? null :
          (
            <div className="w-fit m-auto block">
              <Pagination baseURL="/parent/invoices"
                currentPage={typeof searchParams.page === 'string' ? searchParams.page : undefined}
                searchParams={searchParams}
                totalPages={totalPages}
              />
            </div>
          )
      }
    </div>
  )
}