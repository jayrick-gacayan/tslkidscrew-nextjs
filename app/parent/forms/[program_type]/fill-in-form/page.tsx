import FormActionContainer from './_section/form-action-container';
import { LocationPlace } from '@/models/location-place';
import {
  getProgramSettingYearCycleForRegRecordAction,
  getSummerCampRegPromosForPromoAction,
  getSummerCampRegWeeksForRecordAction,
  getSummerCampWeeksForPromoAction,
  getVacationCampsForCreateRegRecordAction
} from '@/actions/registration-create-actions';
import { SummerCampPromoSetting } from '@/models/summer-camp-promo-setting';
import { SummerCampWeekSetting } from '@/models/summer-camp-week-setting';
import { ProgramYearCycleSetting } from '@/models/program-year-cycle-setting';
import { getCustomerInfoAction } from '@/actions/parent-info-actions';
import { getAllLocationOnProgramTypeAction } from '@/actions/location-actions';
import { VacationCampSetting } from '@/models/vacation-camp-setting';
import { PROGRAM_TYPES } from '@/types/constants/program-type';
import { kebabCase } from 'change-case';
import { Parent } from '@/models/parent';

export async function generateStaticParams(): Promise<{ program_type: string; }[]> {
  return PROGRAM_TYPES.map((val: string) => {
    return { program_type: val === 'After School' ? 'before-and-after-school' : kebabCase(val) };
  });
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { program_type: string }
  searchParams: { [key: string]: string | string[] | undefined; }
}) {
  let summerCampWeeks: Partial<SummerCampWeekSetting>[] = [];
  let programYearCycle: ProgramYearCycleSetting & any | undefined = undefined;
  let vacationCamps: Partial<VacationCampSetting>[] | undefined = [];
  let summerCampWeeksForPromo: Partial<SummerCampWeekSetting>[] = [];

  const { program_type } = params;

  let step = typeof searchParams.step === 'string' ? searchParams.step : undefined;
  let location_id = typeof searchParams.location_id === 'string' ? searchParams.location_id : undefined;

  const summerCampPromos: SummerCampPromoSetting[] | undefined = await getSummerCampRegPromosForPromoAction();

  let locationsByProgramType: LocationPlace[] = await getAllLocationOnProgramTypeAction(program_type);
  let customerData = await getCustomerInfoAction();

  if (location_id) {
    summerCampWeeks = (await getSummerCampRegWeeksForRecordAction(location_id)) ?? [];
    programYearCycle = await getProgramSettingYearCycleForRegRecordAction(location_id);
    vacationCamps = (await getVacationCampsForCreateRegRecordAction(location_id)) ?? [];
    summerCampWeeksForPromo = (await getSummerCampWeeksForPromoAction()) ?? [];
  }

  return (
    <div className='flex-1 w-full h-full'>
      <div className='pb-12'>
        <div className='rounded drop-shadow h-full bg-white w-full xl:w-8/12 m-auto block p-6'>
          <FormActionContainer step={step}
            program_type={program_type}
            cardDetails={!!customerData.data ? customerData.data as Pick<Parent, 'card_brand' | 'card_last_four'> : undefined}
            locations={locationsByProgramType}

            summerCampPromos={summerCampPromos!}
            summerCampWeeks={summerCampWeeks}
            summerCampWeeksForPromo={summerCampWeeksForPromo}
            programYearCycle={programYearCycle}
            vacationCamps={vacationCamps}
            bankDetails={!!customerData.data ? customerData.data as Pick<Parent, 'bank_name'> : undefined} />
        </div>
      </div>
    </div>
  )
}