import BackButtonClient from "@/app/_components/back-button-client";
import ChildrenInformation from "./_sections/children-information";
import ProgramTypeInformation from "./_sections/program-type-information";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="pb-12">
      <div className="rounded bg-white drop-shadow-lg p-8 space-y-6">
        <BackButtonClient />
        <h1 className="font-medium text-[24px]">North Colonie After School</h1>
        <div className="block space-y-2">
          <p className="text-tertiary">ENROLLMENT INFORMATION</p>
          <p className="space-x-1">
            <span>Your enrollment is currently</span>
            <span className="text-success">ACTIVE</span>.
            <span>To unenroll, please contact your program director.</span>
          </p>
        </div>
        <ChildrenInformation />
        <ProgramTypeInformation />
      </div>
    </div>
  )
}