import { BeforeOrAfterSchoolSetting } from "@/models/before-or-after-school-setting";
import { useCallback, useMemo, useState } from "react";
import SettingListboxCustom from "../_components/setting-custom-lisbox";

export default function BeforeAfterCurrentYearCyclePrice({
  currentBeforeOrAfterSchoolSettings,
}: {
  currentBeforeOrAfterSchoolSettings: BeforeOrAfterSchoolSetting[];
}) {
  const [daySelection, setDaySelection] = useState('everyday');

  const daysNumber = useMemo(() => {
    return daySelection === 'everyday' ? 1 : daySelection === '3-days-per-week' ? 3 : 4;
  }, [daySelection])

  const beforeSettingsToShow = useMemo(() => {
    return currentBeforeOrAfterSchoolSettings.filter((beforeSchoolSetting: BeforeOrAfterSchoolSetting) => {
      return beforeSchoolSetting.days_per_week === daysNumber;
    })
  }, [daysNumber, currentBeforeOrAfterSchoolSettings]);

  const getBOASByProgramType = useCallback((childCount: number, programType: string) => {
    return beforeSettingsToShow.find((beforeSettingsToShow: BeforeOrAfterSchoolSetting) => {
      const { child_record_count, program_type } = beforeSettingsToShow;
      return child_record_count === childCount && program_type === programType
    })
  }, [beforeSettingsToShow]);

  return (
    <div className="space-y-4">
      <div className="flex md:flex-row flex-col items-start md:items-center gap-2">
        <div className="flex-1">
          <h1 className="font-medium text-[24px] text-black">Update Price for Current Year Cycle</h1>
        </div>
        <div className="flex-none">
          <div className="relative">
            <SettingListboxCustom listboxData={daySelection}
              onChangeListbox={(value: any) => { setDaySelection(value); }}
              items={['up-to-3-days-a-week', '4-to-5-days-a-week', 'everyday']}
              keyDescription='show-current-before-or-after-setting' />
          </div>
        </div>
      </div>
      <div className="block overflow-auto">
        <table className="min-w-[1024px] w-full">
          <thead>
            <tr className="[&>th]:font-medium [&>th]:text-black [&>th]:px-2 [&>th]:py-3 [&>th]:bg-secondary-light">
              <th className="w-48">Name</th>
              <th>Before Care</th>
              <th>After Care</th>
              <th>Both</th>
            </tr>
          </thead>
          <tbody>
            {
              [1, 2, 3].map((childValue) => {
                let beforeBOAS = getBOASByProgramType(childValue, 'before');
                let afterBOAS = getBOASByProgramType(childValue, 'after');
                let bothBOAS = getBOASByProgramType(childValue, 'both');
                return (
                  <tr key={`before-after-current-year-cycle-${childValue}`}
                    className="[&>td]:font-medium [&>td]:text-black [&>td]:text-center [&>td]:px-2 [&>td]:py-3 [&>td]:bg-secondary">
                    <td className="w-48">Children #{childValue}</td>
                    <td >
                      <span className={`block w-full border border-secondary-light p-3 bg-white rounded text-center`}
                        onClick={() => { }}>
                        {
                          Intl.NumberFormat('en-US', {
                            style: "currency",
                            currency: 'USD',
                          }).format(beforeBOAS?.price ?? 0)
                        }
                      </span>
                    </td>
                    <td >
                      <span className={`block w-full border border-secondary-light p-3 bg-white rounded text-center`}
                        onClick={() => { }}>
                        {
                          Intl.NumberFormat('en-US', {
                            style: "currency",
                            currency: 'USD',
                          }).format(afterBOAS?.price ?? 0)
                        }
                      </span>
                    </td>
                    <td >
                      <span className={`block w-full border border-secondary-light p-3 bg-white rounded text-center`}
                        onClick={() => { }}>
                        {
                          Intl.NumberFormat('en-US', {
                            style: "currency",
                            currency: 'USD',
                          }).format(bothBOAS?.price ?? 0)
                        }
                      </span>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}