import Link from "next/link";
export default function CampCard({
  labelText,
  isDisabled = false
}: {
  labelText: string;
  isDisabled?: boolean;
}) {
  return (
    <div className="mb-8 h-56 p-4 rounded-lg drop-shadow bg-white relative overflow-hidden w-full">
      <Link href='/' className="flex flex-col h-full gap-2 relative z-0">
        <div className="flex-1" />
        <div className="flex-none">
          <h1 className="font-medium text-black text-[20px] text-center">{labelText}</h1>
        </div>
      </Link>
      {
        isDisabled &&
        (
          <div className="absolute top-0 left-0 w-full h-full z-10 bg-default-light/[.25] cursor-not-allowed">
            <div className="h-full text-white flex items-center justify-center">
              <div className="text-[32px]">
                SOON
              </div>
            </div>
          </div>
        )
      }

    </div>
  )
}