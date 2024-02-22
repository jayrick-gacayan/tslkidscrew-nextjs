'use client';

import ShowEntriesSelect from "@/app/_components/show-entries-select";
import { useState } from "react";

export default function RegistrationInfoHeader() {
  const [entries, setEntries] = useState<number>(10);
  return (
    <div className="flex sm:flex-row flex-col gap-4 items-start sm:items-center justify-between">
      <div className="flex-1 text-black">
        <h1 className="font-medium text-[24px]">My Programs</h1>
      </div>
      <div className="flex-none sm:w-auto w-full">
        <ShowEntriesSelect value={entries} onChange={setEntries} items={[10, 20, 30]} />
      </div>
    </div>
  )
}