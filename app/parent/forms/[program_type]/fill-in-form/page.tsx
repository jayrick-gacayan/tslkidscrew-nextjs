import { getAllLocationsForRegRecordCreate } from "@/services/location-services";
import FillInFormProvider from "./_context/fill-in-form-provider";
import FormActionContainer from "./_section/form-action-container";
import { Session } from "next-auth";
import { Parent } from "@/models/parent";
import { auth } from "@/auth";
import { Result } from "@/models/result";
import { LocationPlace } from "@/models/location";

export async function generateStaticParams(): Promise<{ program_type: string; }[]> {
  return [
    { program_type: 'vacation-camp' },
    { program_type: 'summer-camp' },
    { program_type: 'before-or-after-school' }
  ]
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { program_type: string }
  searchParams: { [key: string]: string | string[] | undefined; }
}) {
  let parent: Session<Parent> | null = await auth();
  const { program_type } = params;
  const step = typeof searchParams.step === 'string' ? searchParams.step : undefined;

  let locationDataByProgramType: Result<LocationPlace[]> = await getAllLocationsForRegRecordCreate(
    program_type === 'summer-camp' ? 'Summer Camp' :
      program_type === 'vacation-camp' ? 'Vacation Camp' :
        'After School'
    , parent?.accessToken!);

  let locationData: Partial<LocationPlace>[] = locationDataByProgramType.data?.map((val: LocationPlace) => {
    return {
      id: val.id,
      name: val.name,
      minimum_age: val.minimum_age
    }
  }) ?? [];

  return (
    <FillInFormProvider>
      <div className='pb-12 w-full'>
        <div className="rounded drop-shadow bg-white w-full xl:w-8/12 m-auto block p-6 max-h-fit">
          <FormActionContainer step={step}
            program_type={program_type}
            locations={locationData} />
        </div>
      </div>
    </FillInFormProvider>

  )
}