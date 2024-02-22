import { auth } from "@/auth"
import { Paginate } from "@/models/paginate";
import { Parent } from "@/models/parent";
import { Result } from "@/models/result";
import { Session } from "next-auth";
import { SearchParamsProps } from "@/types/props/search-params-props";
import ReceiptHeader from "./_sections/receipt-header";
import { getAllCustomerReceipts } from "@/services/receipt-services";
import { Receipt } from "@/models/receipt";
import ReceiptInfoTable from "./_sections/receipt-info-table";

export default async function Page({ searchParams }: { searchParams: SearchParamsProps }) {
  let parent: Session<Parent> | null = await auth();
  let result: Result<Paginate<Receipt>> = await getAllCustomerReceipts(parent?.accessToken!);

  let showEntry = typeof searchParams.per_page === 'string' ? parseInt(searchParams.per_page) : 10;
  let totalPages = Math.ceil(result.data?.total ?? 1 / showEntry) ?? 1
  let data = result.data?.data ?? [];

  return (
    <div className="rounded bg-white drop-shadow-lg py-4 px-8 space-y-6">
      <ReceiptHeader showEntry={showEntry} />
      <ReceiptInfoTable receipts={data} />
    </div>
  )
}