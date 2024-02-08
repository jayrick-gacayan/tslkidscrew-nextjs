import BackButtonClient from "../../../_components/back-button-client";
import { EditFormLocation } from "./_sections/edit-form-location";

export default function Page(props: any) {

  return (
    <div className="rounded bg-white drop-shadow-lg p-4">
      <div className="w-full lg:w-6/12 m-auto block space-y-8">
        <BackButtonClient />
        <h1 className="text-[32px] font-medium text-black">Edit Location</h1>
        <EditFormLocation />
      </div>
    </div>
  )
}