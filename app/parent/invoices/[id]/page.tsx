import BackButtonClient from "@/app/_components/back-button-client";
import { auth } from "@/auth";
import { Invoice } from "@/models/invoice";
import { Parent } from "@/models/parent";
import { Result } from "@/models/result";
import { getCustomerInvoice } from "@/services/invoice-services";
import { Session } from "next-auth";
import { notFound } from "next/navigation";
import InvoiceInfoData from "../_components/invoice-info-data";

export default async function Page({ params }: { params: { id: string; } }) {
  let parent: Session | null = await auth();
  let result: Result<Invoice> = await getCustomerInvoice(params.id, parent?.user?.accessToken!);

  if (!result.data) {
    notFound();
  }

  let invoice: Invoice = result.data;

  return (
    <div className="pb-12">
      <div className="rounded bg-white drop-shadow-lg p-8 space-y-6">
        <BackButtonClient />
        <h1 className="font-medium text-[24px]">Invoice {params.id}</h1>
        <div className="space-y-4">
          <InvoiceInfoData labelText='Invoice Amount:'
            data={Intl.NumberFormat('en-US', {
              style: "currency",
              currency: 'USD',
            }).format(invoice.invoice_amount!)} />
          <InvoiceInfoData labelText='Amount Paid:'
            data={Intl.NumberFormat('en-US', {
              style: "currency",
              currency: 'USD',
            }).format(invoice.amount_paid!)} />
          <InvoiceInfoData labelText='Discounts:'
            data={Intl.NumberFormat('en-US', {
              style: "currency",
              currency: 'USD',
            }).format(invoice.discount!)} />
          <InvoiceInfoData labelText='Fees:'
            data={Intl.NumberFormat('en-US', {
              style: "currency",
              currency: 'USD',
            }).format(invoice.fees!)} />
          <InvoiceInfoData labelText='Due:'
            data={Intl.NumberFormat('en-US', {
              style: "currency",
              currency: 'USD',
            }).format(invoice.due!)} />
        </div>
      </div>
    </div>
  )
}