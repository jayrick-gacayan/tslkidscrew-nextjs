import BackButtonClient from "../../../../../_components/back-button-client";
import type { Metadata } from "next";
import EditFormLocationContainer from "./_sections/edit-location-form-container";

export const metadata: Metadata = {
  title: 'Edit Location',
  description: 'Edit Location Page'
}

export default function Page({ params }: { params: { id: string; } }) {

  return (
    <div className="rounded bg-white drop-shadow-lg p-4">
      <div className="w-full lg:w-6/12 m-auto block space-y-8">
        <BackButtonClient />
        <h1 className="text-[32px] font-medium text-black">Edit Location</h1>
        <EditFormLocationContainer id={params.id} />
      </div>
    </div>
  )
}