import BackButtonClient from "@/app/admin/(dashboard)/_components/back-button-client"
import NewProgramForm from "./sections/new-program-form"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Create Location Program',
  description: 'Create Location Program Page'
}

export default function Page(props: any) {
  return (
    <div className="rounded bg-white drop-shadow-lg p-4">
      <div className="w-full lg:w-6/12 m-auto block space-y-8">
        <BackButtonClient />
        <h1 className="text-[32px] font-medium text-black">New Program</h1>
        <NewProgramForm />
      </div>
    </div>
  )
}