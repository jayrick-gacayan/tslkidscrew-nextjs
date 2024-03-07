import { getAllLocationsForRegRecordCreate } from "@/services/location-services";
import FormActionContainer from "./_section/form-action-container";
import { Session } from "next-auth";
import { Parent } from "@/models/parent";
import { auth } from "@/auth";
import { Result } from "@/models/result";
import { LocationPlace } from "@/models/location";
import { capitalCase } from "change-case";
import { getCustomerInfo } from "@/services/parent-info-services";

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
    program_type === 'before-or-after-school' ? 'After School' : capitalCase(program_type)
    , parent?.accessToken!);

  let locationData: Partial<LocationPlace>[] = locationDataByProgramType.data?.map((val: LocationPlace) => {
    return {
      id: val.id,
      name: val.name,
      minimum_age: val.minimum_age
    }
  }) ?? [];

  let customerData = await getCustomerInfo(parent?.user?.customer_id?.toString()!, parent?.accessToken!)

  let { card_last_four, card_brand, ...rest } = customerData.data!
  return (
    <div className='pb-12 w-full'>
      <div className="rounded drop-shadow bg-white w-full xl:w-8/12 m-auto block p-6 max-h-fit">
        <FormActionContainer step={step}
          program_type={program_type}
          cardDetails={!!card_brand && !!card_last_four ? { card_brand, card_last_four } : undefined}
          locations={locationData} />
      </div>
    </div>
  )
}