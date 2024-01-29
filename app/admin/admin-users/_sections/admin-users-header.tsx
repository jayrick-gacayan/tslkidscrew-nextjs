'use client';

import { useContext, useState } from "react";
import AdminHeaderWithEntries from "../../_components/admin-header-with-entries";
import ShowEntriesSelect from "../../_components/show-entries-select";
import { reduxStore } from "@/react-redux/redux-store";
import { modalFormOpened } from "../_redux/admin-users-slice";
import { SampleContext } from "./form-actions-providers";

export default function AdminUsersHeader() {
  const { state, formAction } = useContext(SampleContext);
  const [entries, setEntries] = useState<number>(10);

  return (
    <AdminHeaderWithEntries headerText='Admin Users'>
      <div className='flex w-full sm:w-fit items-center gap-4'>
        <ShowEntriesSelect value={entries} onChange={setEntries} items={[10, 20, 30]} />
        <div className="w-full">
          <button className="rounded text-white bg-primary px-4 py-2 text-sm text-center"
            onClick={() => {
              formAction();
              reduxStore.dispatch(modalFormOpened({ open: true, type: 'add' }));
            }}>
            Add a New Admin User
          </button>
        </div>
      </div>
    </AdminHeaderWithEntries>
  )
}