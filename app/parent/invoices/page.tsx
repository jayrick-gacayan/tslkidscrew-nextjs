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

export default async function Page({ searchParams }: { searchParams: SearchParamsProps }) {
  let parent: Session<Parent> | null = await auth();
  let result: Result<Paginate<Invoice>> = await getAllCustomerInvoices(parent?.accessToken!);

  let showEntry = typeof searchParams.per_page === 'string' ? parseInt(searchParams.per_page) : 10;
  let totalPages = Math.ceil(result.data?.total ?? 1 / showEntry) ?? 1
  let data = result.data?.data ?? [];

  return (
    <div className="rounded bg-white drop-shadow-lg py-4 px-8 space-y-6">
      <InvoicesHeader showEntry={showEntry} />
      <InvoicesInfoTable invoices={data} />
    </div>
  )
}