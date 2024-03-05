import Fa6SolidEye from "@/app/_components/svg/fa6-solid-eye";
import { Invoice } from "@/models/invoice";
import { currencyFormat } from "@/types/helpers/currency-format";
import { dateString } from "@/types/helpers/date-helpers";
import Link from "next/link";

export default function InvoicesInfoTable({ invoices }: { invoices: Invoice[] }) {

  return (
    <div className={`block overflow-auto rounded bg-secondary ${invoices.length > 10 ? 'h-[512px]' : 'h-auto'}`}>
      <table className="min-w-[1024px] w-full">
        <thead>
          <tr className="bg-secondary-light [&>th]:font-medium [&>th]:px-3 [&>th]:py-2 [&>th]:text-black">
            <th className="w-auto">Invoice</th>
            <th className="w-32">DUE DATE</th>
            <th className="w-56">AMOUNT REMAINING</th>
            <th className="w-32">STATUS</th>
            <th className="w-32">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {
            invoices.map((invoice: Invoice, index: number) => {
              return (
                <tr key={`invoice-data-${invoice.id}-${index}`}
                  className="bg-secondary [&>td]:px-3 [&>td]:py-2 [&>td]:text-center">
                  <td className="w-auto">{invoice.id!} &#47; {invoice.memo!}</td>
                  <td className="w-32">{dateString(invoice.due_date!, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td className="w-56 text-center">{currencyFormat('en-US', { style: "currency", currency: 'USD', }, invoice.amount_paid ?? 0)}</td>
                  <td className="w-32">{invoice.paid ? 'PAID' : 'NOT PAID'}</td>
                  <td className="w-32">
                    <div className="flex items-center justify-center w-full gap-2">
                      <Link href={`/parent/invoices/${invoice.id!}`}
                        className="text-primary block cursor-pointer">
                        <Fa6SolidEye />
                      </Link>
                    </div>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}