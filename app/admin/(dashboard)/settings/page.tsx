import AdminHeaderWithEntries from '../_components/admin-header-with-entries';
import TabsContainer from './_sections/tabs-container';
import { Result } from '@/models/result';
import { SummerCampWeekSetting } from '@/models/summer-camp-week-setting';
import { SummerCampSwimSetting } from '@/models/summer-camp-swim-setting';
import { ProgramYearCycleSetting } from '@/models/program-year-cycle-setting';
import { SummerCampPromoSetting } from '@/models/summer-camp-promo-setting';
import { VacationCampSetting } from '@/models/vacation-camp-setting';
import { BeforeOrAfterSchoolSetting } from '@/models/before-or-after-school-setting';
import {
  getBeforeOrAfterSchoolSettingsAction,
  getProgramYearCycleSettingsAction,
  getSummerCampPromoSettingsAction,
  getSummerCampSwimPricesAction,
  getSummerCampWeekPricesAction,
  getVacationCampSchedulesSettingsAction
} from '@/actions/program-settings-actions';


export default async function Page() {
  let summerCampWeekSettings: Result<SummerCampWeekSetting[]> = await (await getSummerCampWeekPricesAction());
  let summerCampSwimSettings: Result<SummerCampSwimSetting[]> = await (await getSummerCampSwimPricesAction());
  let summerCampPromoSettings: Result<SummerCampPromoSetting[]> = await (await getSummerCampPromoSettingsAction());
  let vacationCampSettings: Result<VacationCampSetting[]> = await (await getVacationCampSchedulesSettingsAction());
  let programYearCycleSetting: Result<ProgramYearCycleSetting> = await (await getProgramYearCycleSettingsAction());
  let beforeOrAfterSchoolSettings: Result<BeforeOrAfterSchoolSetting[]> = await (await getBeforeOrAfterSchoolSettingsAction());

  return (
    <div className='pb-6'>
      <div className='rounded bg-white drop-shadow-lg py-4 px-8 space-y-4'>
        <AdminHeaderWithEntries headerText='Settings' />
        <TabsContainer summerCampWeekSettings={summerCampWeekSettings?.data ?? []}
          summerCampSwimSettings={summerCampSwimSettings?.data ?? []}
          summerCampPromoSettings={summerCampPromoSettings?.data ?? []}
          programYearCycleSetting={programYearCycleSetting?.data!}
          vacationCampSettings={vacationCampSettings?.data ?? []}
          beforeOrAfterSchoolSettings={beforeOrAfterSchoolSettings?.data ?? []} />
      </div>
    </div>
  );
}