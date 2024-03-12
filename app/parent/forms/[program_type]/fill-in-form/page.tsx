import { getAllLocationsForCreateRegRecord } from "@/services/location-services";
import FormActionContainer from "./_section/form-action-container";
import { Session } from "next-auth";
import { Parent } from "@/models/parent";
import { auth } from "@/auth";
import { Result } from "@/models/result";
import { LocationPlace } from "@/models/location-place";
import { capitalCase } from "change-case";
import { getCustomerInfo } from "@/services/parent-info-services";
import { getSummerCampRegPromosForPromoAction } from "@/actions/registration-create-action";
import { SummerCampPromoSetting } from "@/models/summer-camp-promo-setting";

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
  let parent: Session | null = await auth();
  const { program_type } = params;
  const step = typeof searchParams.step === 'string' ? searchParams.step : undefined;

  const summerCampPromos: SummerCampPromoSetting[] | undefined = await getSummerCampRegPromosForPromoAction();

  let locationDataByProgramType: Result<LocationPlace[]> = await getAllLocationsForCreateRegRecord(
    program_type === 'before-or-after-school' ? 'After School' : capitalCase(program_type)
    , parent?.user?.accessToken!);

  let locationData: Partial<LocationPlace>[] = locationDataByProgramType.data?.map((val: LocationPlace) => {
    return {
      id: val.id,
      name: val.name,
      minimum_age: val.minimum_age
    }
  }) ?? [];

  let customerData = await getCustomerInfo(parent?.user?.customer_id?.toString()!, parent?.user?.accessToken!)

  let { card_last_four, card_brand, ...rest } = customerData.data!
  return (
    <div className='pb-12 w-full'>
      <div className="rounded drop-shadow bg-white w-full xl:w-8/12 m-auto block p-6 max-h-fit">
        <FormActionContainer step={step}
          program_type={program_type}
          cardDetails={!!card_brand && !!card_last_four ? { card_brand, card_last_four } : undefined}
          locations={locationData}
          summerCampPromos={summerCampPromos!} />
      </div>
    </div>
  )
}