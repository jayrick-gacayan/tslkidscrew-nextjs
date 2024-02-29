import { BeforeOrAfterSchoolSetting } from "@/models/before-or-after-school-setting";
import { RefObject, useCallback, useMemo, useRef, useState } from "react";
import SettingListboxCustom from "../_components/setting-custom-lisbox";
import InputCustom from "@/app/_components/input-custom";
import { useOnClickOutside } from "usehooks-ts";

export default function BeforeAfterCurrentYearCyclePrice({
  currentBeforeOrAfterSchoolSettings,
}: {
  currentBeforeOrAfterSchoolSettings: BeforeOrAfterSchoolSetting[];
}) {
  const formRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [daySelection, setDaySelection] = useState('everyday');
  const [currentIdx, setCurrentIdx] = useState<number | undefined>(undefined)

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

  function handleClickRef(e: any, idx: number) {
    setCurrentIdx(idx);
    formRefs.current[idx]?.querySelector('span')?.classList.remove('block')
    formRefs.current[idx]?.querySelector('span')?.classList.add('hidden')
    formRefs.current[idx]?.querySelector('form')?.classList.add('block')
    formRefs.current[idx]?.querySelector('form')?.classList.remove('hidden')
  }

  // useOnClickOutside(formRefs, () => {
  //   if (currentIdx) {

  //     formRefs.current[currentIdx].current?.querySelector('span')?.classList.remove('hidden')
  //     formRefs.current[currentIdx].current?.querySelector('span')?.classList.add('block')
  //     formRefs.current[currentIdx].current?.querySelector('form')?.classList.add('hidden')
  //     formRefs.current[currentIdx].current?.querySelector('form')?.classList.remove('block');
  //     setCurrentIdx(undefined);
  //   }
  // })

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
              <th className="w-auto">Before Care</th>
              <th className="w-auto">After Care</th>
              <th className="w-auto">Both</th>
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
                    <td className="w-auto">
                      <div ref={(ref) => { formRefs.current[childValue - 1] = ref }}
                        onClick={() => { setCurrentIdx(childValue - 1) }}>
                        <form className="hidden w-full">
                          <input type='hidden' name='master_prices[][id]' value={beforeBOAS?.id ?? 1} />
                          <InputCustom type="text"
                            id={`before-or-after-school-setting-before-${beforeBOAS?.id!}`}
                            inputMode="numeric"
                            name="master_prices[][price]"
                            defaultValue={beforeBOAS?.price?.toString() ?? ''}
                            className="bg-white text-center" />
                        </form>
                        <span className={`block w-full border border-secondary-light p-3 bg-white rounded text-center`}
                          onClick={() => { }}>
                          {
                            Intl.NumberFormat('en-US', {
                              style: "currency",
                              currency: 'USD',
                            }).format(beforeBOAS?.price ?? 0)
                          }
                        </span>
                      </div>
                    </td>
                    <td className="w-auto">
                      <div ref={(ref) => { formRefs.current[childValue + 0] = ref }}
                        onClick={() => { }}>
                        <form className="hidden w-full">
                          <input type='hidden' name='master_prices[][id]' value={afterBOAS?.id ?? 1} />
                          <InputCustom type="text"
                            id={`before-or-after-school-setting-before-${afterBOAS?.id!}`}
                            inputMode="numeric"
                            name="master_prices[][price]"
                            defaultValue={afterBOAS?.price?.toString() ?? ''}
                            className="bg-white text-center" />
                        </form>
                        <span className={`block w-full border border-secondary-light p-3 bg-white rounded text-center`}
                          onClick={() => { }}>
                          {
                            Intl.NumberFormat('en-US', {
                              style: "currency",
                              currency: 'USD',
                            }).format(afterBOAS?.price ?? 0)
                          }
                        </span>
                      </div>
                    </td>
                    <td className="w-auto">
                      <div ref={(ref) => { formRefs.current[childValue - 1] = ref }}
                        onClick={() => { }}>
                        <form className="hidden w-full">
                          <input type='hidden' name='master_prices[][id]' value={bothBOAS?.id ?? 1} />
                          <InputCustom type="text"
                            id={`before-or-after-school-setting-before-${bothBOAS?.id!}`}
                            inputMode="numeric"
                            name="master_prices[][price]"
                            defaultValue={bothBOAS?.price?.toString() ?? ''}
                            className="bg-white text-center" />
                        </form>
                        <span className={`block w-full border border-secondary-light p-3 bg-white rounded text-center`}
                          onClick={() => { }}>
                          {
                            Intl.NumberFormat('en-US', {
                              style: "currency",
                              currency: 'USD',
                            }).format(bothBOAS?.price ?? 0)
                          }
                        </span>
                      </div>

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