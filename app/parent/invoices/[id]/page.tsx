import BackButtonClient from "@/app/_components/back-button-client";
import { Invoice } from "@/models/invoice";
import { Result } from "@/models/result";
import { notFound } from "next/navigation";
import ParentInfoData from "../../_components/parent-info-data";
import { getCustomerInvoiceAction } from "@/actions/invoices-actions";

export default async function Page({ params }: { params: { id: string; } }) {
  let result: Result<Invoice> = await getCustomerInvoiceAction(params.id);

  if (!result.data) { notFound(); }

  let invoice: Invoice = result.data;

  return (
    <div className="pb-12">
      <div className="rounded bg-white drop-shadow-lg p-8 space-y-6">
        <BackButtonClient />
        <h1 className="font-medium text-[24px]">Invoice {params.id}</h1>
        <div className="space-y-4">
          <ParentInfoData labelText='Invoice Amount:'
            data={Intl.NumberFormat('en-US', {
              style: "currency",
              currency: 'USD',
            }).format(invoice.invoice_amount!)} />
          <ParentInfoData labelText='Amount Paid:'
            data={Intl.NumberFormat('en-US', {
              style: "currency",
              currency: 'USD',
            }).format(invoice.amount_paid!)} />
          <ParentInfoData labelText='Discounts:'
            data={Intl.NumberFormat('en-US', {
              style: "currency",
              currency: 'USD',
            }).format(invoice.discount!)} />
          <ParentInfoData labelText='Fees:'
            data={Intl.NumberFormat('en-US', {
              style: "currency",
              currency: 'USD',
            }).format(invoice.fees!)} />
          <ParentInfoData labelText='Due:'
            data={Intl.NumberFormat('en-US', {
              style: "currency",
              currency: 'USD',
            }).format(invoice.due!)} />
        </div>
      </div>
    </div>
  )
}