import Fa6SolidEye from "@/app/_components/svg/fa6-solid-eye";
import TableEmptyData from "@/app/_components/table-empty-data";
import SomethingWentWrongClient from "@/app/_components/table-something-went-wrong-client";
import { Receipt } from "@/models/receipt";
import { currencyFormat } from "@/types/helpers/currency-format";
import { dateString } from "@/types/helpers/date-helpers";
import Link from "next/link";

export default function ReceiptInfoTable({ receipts }: { receipts: Receipt[] | undefined }) {
  return (
    <div className='block overflow-auto rounded bg-secondary min-h-[512px] h-full'>
      <table className={`min-w-[1024px] w-full
        ${!receipts || receipts.length === 0 || receipts.length > 10 ? 'h-full min-h-[512px]' : 'h-auto'}`}>
        <thead>
          <tr className="bg-secondary-light [&>th]:font-medium [&>th]:px-3 [&>th]:py-2 [&>th]:text-black">
            <th className="w-48">Date of Issuance</th>
            <th className="w-48">Program Name</th>
            <th className="w-auto">Payment For</th>
            <th className="w-40">Amount</th>
            <th className="w-32">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {
            !receipts ? (<SomethingWentWrongClient />) :
              receipts.length === 0 ? (<TableEmptyData />) :
                (
                  <>
                    {
                      receipts.map((receipt: Receipt, index: number) => {
                        return (
                          <tr key={`receipt-data-${receipt.id}-${index}`}
                            className="bg-secondary [&>td]:px-3 [&>td]:py-2 [&>td]:text-center">
                            <td className="w-48">
                              {dateString(receipt.created_at!, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </td>
                            <td className="w-48">{receipt.program_name!}</td>
                            <td className="w-auto">{receipt.payment_for!}</td>
                            <td className="w-48 text-center">
                              {
                                currencyFormat('en-US', { style: "currency", currency: 'USD', }, receipt.amount!)
                              }
                            </td>
                            <td className="w-32">
                              <div className="flex items-center justify-center w-full gap-2">
                                <Link href={`/parent/receipts`}
                                  className="text-primary block cursor-pointer">
                                  <Fa6SolidEye />
                                </Link>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </>
                )
          }
        </tbody>
      </table>
    </div>
  )
}