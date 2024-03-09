import { capitalCase } from "change-case";
import { notFound } from "next/navigation";
import ProgramTypeTabContainer from "./_section/program-type-tab-container";
import Link from "next/link";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { Parent } from "@/models/parent";
import { getCustomerInfo } from "@/services/parent-info-services";

export async function generateStaticParams(): Promise<{ program_type: string; }[]> {
  return [
    { program_type: 'vacation-camp' },
    { program_type: 'summer-camp' },
    { program_type: 'before-or-after-school' }
  ]
}

export default async function Page({
  params
}: {
  params: { program_type: string }
}) {
  let program_type = params.program_type;

  let parent: Session | null = await auth();

  if (program_type !== 'vacation-camp' &&
    program_type !== 'summer-camp' &&
    program_type !== 'before-or-after-school'
  ) {
    return notFound();
  }

  let customerInfoData = await getCustomerInfo(parent?.user.customer_id?.toString()!, parent?.user?.accessToken!);


  return (
    <div className="pb-12 w-full">
      <div className="rounded drop-shadow bg-white w-full lg:w-8/12 mx-auto block p-6 space-y-6">
        <h1 className="text-center font-medium text-[32px] text-black">
          {capitalCase(program_type)} for Capital Region Families
        </h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <div className="block rounded bg-tertiary-dark h-72" />
        <ProgramTypeTabContainer />
        <div className="w-fit ml-auto block">
          <Link href={`/parent/forms/${program_type}/fill-in-form`}
            className="bg-primary px-3 py-2 w-auto text-white rounded">
            Create Form
          </Link>
        </div>
      </div>
    </div>

  )
}