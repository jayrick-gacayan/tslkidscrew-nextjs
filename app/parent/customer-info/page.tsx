import { auth } from "@/auth";
import CustomerInfoForm from "./_sections/customer-info-form";
import { Session } from "next-auth";

export default async function Page() {
  let parent: Session | null = await auth();

  let parentData: Omit<Session, 'accessToken'> | null = parent;
  return (
    <div className="pb-8">
      <div className="rounded bg-white drop-shadow-lg py-4 px-8 space-y-6">
        <h1 className="text-[24px] font-bold">Welcome to TSL!</h1>
        <p>It appears that we have some of your information already. Please confirm by reviewing the following form.</p>
        <CustomerInfoForm parent={parentData?.user} />
      </div>
    </div>
  )
}