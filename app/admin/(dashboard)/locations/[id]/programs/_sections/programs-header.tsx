'use client';

import { useState } from "react";
import Link from "next/link";
import AdminHeaderWithEntries from "@/app/admin/(dashboard)/_components/admin-header-with-entries";
import ShowEntriesSelect from "@/app/admin/(dashboard)/_components/show-entries-select";

export default function ProgramsHeader() {
  const [entries, setEntries] = useState<number>(10);

  return (
    <AdminHeaderWithEntries headerText='Programs'>
      <div className='flex w-fit items-center gap-4'>
        <ShowEntriesSelect value={entries} onChange={setEntries} items={[10, 20, 30]} />
        <div>
          <Link href='/admin/locations/1/programs/new'
            className="rounded text-white bg-primary px-4 py-2 text-sm block text-center">
            Create a New Program
          </Link>
        </div>
      </div>
    </AdminHeaderWithEntries>
  )
}