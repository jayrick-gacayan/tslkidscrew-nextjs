'use client';
import { useState } from "react";
import AdminHeaderWithEntries from "../../_components/admin-header-with-entries";
import ShowEntriesSelect from "../../_components/show-entries-select";
import Link from "next/link";

export default function LocationsHeader() {
  const [entries, setEntries] = useState<number>(10);

  return (
    <AdminHeaderWithEntries headerText='Locations'>
      <div className='flex w-fit items-center gap-4'>
        <ShowEntriesSelect value={entries} onChange={setEntries} items={[10, 20, 30]} />
        <div>
          <Link href='/admin/locations/new'
            className="rounded text-white bg-primary px-4 py-2 text-sm block">
            Create a New Location
          </Link>
        </div>
      </div>
    </AdminHeaderWithEntries>
  )
}