import { capitalCase } from "change-case";
import { notFound } from "next/navigation";
import ProgramTypeTabContainer from "./_section/program-type-tab-container";
import Link from "next/link";

export default function Page({
  params
}: {
  params: { program_type: string }
}) {
  let program_type = params.program_type;

  if (program_type !== 'vacation-camp' &&
    program_type !== 'summer-camp' &&
    program_type !== 'before-or-after-school'
  ) {
    return notFound();
  }

  return (
    <div className="rounded drop-shadow bg-white w-8/12 m-auto block p-6 space-y-6">
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
  )
}