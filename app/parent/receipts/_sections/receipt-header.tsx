'use client';

import ShowEntriesSelect from "@/app/_components/show-entries-select";

export default function InvoicesHeader({
  showEntry
}: {
  showEntry: number;
}) {
  return (
    <div className="flex sm:flex-row flex-col gap-4 items-start sm:items-center justify-between">
      <div className="flex-1 text-black">
        <h1 className="font-medium text-[24px]">My Receipts</h1>
      </div>
      <div className="flex-none sm:w-auto w-full">
        <ShowEntriesSelect value={showEntry} items={[10, 20, 30]}
          onChange={(entry) => { }} />
      </div>
    </div>
  )
}