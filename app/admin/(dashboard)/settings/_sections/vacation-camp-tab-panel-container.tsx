import { Listbox, Tab, Transition } from "@headlessui/react";
import { Fragment, SetStateAction, useEffect, useMemo, useState } from "react";
import { VacationCampSetting } from "@/models/vacation-camp-setting";
import { Fa6SolidChevronDown } from "@/app/_components/svg/fa6-solid-chevron-down";
import CustomListbox from "@/app/_components/listbox-custom";
import ListboxIconDropdownTwo from "@/app/_components/listbox-icon-dropdown-two";
import VacationCampSettingForm from "./vacation-camp-setting-form";
import { getDayNumArr, setDayNumber } from "@/types/helpers/date-helpers";

export default function VacationCampTabPanelContainer({
  vacationCampSettings
}: {
  vacationCampSettings: VacationCampSetting[];
}) {

  const partialVCSettings: Partial<VacationCampSetting>[] = useMemo(() => {
    return vacationCampSettings.map((vacationCampSetting: VacationCampSetting) => {
      return {
        id: vacationCampSetting.id!,
        name: vacationCampSetting.name ?? ''
      }
    })
  }, [vacationCampSettings])

  const [vacationCamp, setVacationCamp] = useState<Partial<VacationCampSetting> | undefined>(
    partialVCSettings.find((value: VacationCampSetting) => {
      return value.id === 1;
    })
  )

  const vacationCampData = useMemo(() => {
    return vacationCampSettings.find((value: VacationCampSetting) => {
      return value.id === vacationCamp?.id
    })
  }, [
    vacationCamp,
    vacationCampSettings
  ]);

  const getVacationCampDateRangeArr: any[] = useMemo(() => {
    return getDayNumArr(vacationCampData);
  }, [
    vacationCampData
  ]);

  useEffect(() => {
    setVacationCamp(partialVCSettings.find((value: VacationCampSetting) => {
      return value.id === vacationCamp?.id!;
    }))
  }, [partialVCSettings, vacationCamp])

  return (
    <Tab.Panel as='div' id="vacation-camp-panel">
      <div className="space-y-4">
        <VacationCampSettingForm vacationCamp={vacationCamp}
          setVacationCamp={setVacationCamp}
          partialVCSettings={partialVCSettings}
          vacationCampData={vacationCampData}
          arrDays={getVacationCampDateRangeArr} />
      </div>
    </Tab.Panel>
  )
}