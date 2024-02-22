import Fa6SolidEye from "@/app/_components/svg/fa6-solid-eye";
import { Invoice } from "@/models/invoice";
import Link from "next/link";

export default function InvoicesInfoTable({ invoices }: { invoices: Invoice[] }) {

  return (

    <div className="block overflow-auto rounded bg-secondary h-96">
      <table className="min-w-[1024px] w-full">
        <thead>
          <tr className="bg-secondary-light [&>th]:font-medium [&>th]:px-3 [&>th]:py-2 [&>th]:text-black">
            <th className="w-auto">Invoice</th>
            <th className="w-32">DUE DATE</th>
            <th className="w-48">AMOUNT REMAINING</th>
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
                  <td className="w-auto">{invoice.id!}</td>
                  <td className="w-32">{
                    new Date(invoice.due_date!)
                      .toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })
                  }
                  </td>
                  <td className="w-48 text-center">
                    {
                      Intl.NumberFormat('en-US', {
                        style: "currency",
                        currency: 'USD',
                      }).format(invoice.amount_paid!)
                    }
                  </td>
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