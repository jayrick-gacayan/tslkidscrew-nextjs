import { Tab } from '@headlessui/react';
import { Fragment, useMemo } from 'react';
import BeforeAfterCurrentYearCyclePrice from './before-after-current-year-cycle-price';
import BeforeAfterNextYearCyclePrice from './before-after-next-year-cycle-price';
import { BeforeOrAfterSchoolSetting } from '@/models/before-or-after-school-setting';

export default function BeforeAfterSchoolTabPanelContainer({
  beforeOrAfterSchoolSettings
}: {
  beforeOrAfterSchoolSettings: BeforeOrAfterSchoolSetting[];
}) {
  const currentBeforeOrAfterSchoolSettings = useMemo(() => {
    return beforeOrAfterSchoolSettings.filter((beforeOrAfterSchoolSetting: BeforeOrAfterSchoolSetting) => {
      return beforeOrAfterSchoolSetting.year_cycle === 'current_year_cycle'
    });
  }, [beforeOrAfterSchoolSettings]);

  const nextBeforeOrAfterSchoolSettings = useMemo(() => {
    return beforeOrAfterSchoolSettings.filter((beforeOrAfterSchoolSetting: BeforeOrAfterSchoolSetting) => {
      return beforeOrAfterSchoolSetting.year_cycle === 'next_year_cycle'
    });
  }, [beforeOrAfterSchoolSettings]);

  return (
    <Tab.Panel as={Fragment}>
      <div className='space-y-8 divide-y-2 divide-secondary-light'>
        <BeforeAfterCurrentYearCyclePrice currentBeforeOrAfterSchoolSettings={currentBeforeOrAfterSchoolSettings} />
        <BeforeAfterNextYearCyclePrice nextBeforeOrAfterSchoolSettings={nextBeforeOrAfterSchoolSettings} />
      </div>
    </Tab.Panel>
  )
}