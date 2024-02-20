'use client';

import { Tab } from "@headlessui/react";
import SummerCampTabPanelContainer from "./summer-camp-tab-panel-container";
import { Fragment } from "react";
import VacationCampTabPanelContainer from "./vacation-camp-tab-panel-container";
import BeforeAfterSchoolTabPanelContainer from "./before-after-school-tab-panel-container";
import CustomTabItem from "@/app/_components/custom-tab-item";
import YearCycleTabPanelContainer from "./year-cycle-tab-panel-container";
import { SummerCampWeekSetting } from "@/models/summer-camp-week-setting";
import { SummerCampSwimSetting } from "@/models/summer-camp-swim-setting";
import { ProgramYearCycleSetting } from "@/models/program-year-cycle-setting";

export default function TabsContainer({
  summerCampWeekSettings,
  summerCampSwimSettings,
  programYearCycleSetting,
}: {
  summerCampWeekSettings: SummerCampWeekSetting[];
  summerCampSwimSettings: SummerCampSwimSetting[];
  programYearCycleSetting: ProgramYearCycleSetting;
}) {

  return (
    <Tab.Group as={Fragment}>
      <div className='space-y-8 w-full relative'>
        <div className="pb-4 sm:pb-0">
          <div className='flex items-center flex-nowrap w-full overflow-auto'>
            <CustomTabItem labelText='Summer Camp' />
            <CustomTabItem labelText='Vacation Camp' />
            <CustomTabItem labelText='Before and After School' />
            <CustomTabItem labelText='Year Cycle' />
          </div>
        </div>
        <Tab.Panels as={Fragment}>
          <SummerCampTabPanelContainer summerCampWeekSettings={summerCampWeekSettings}
            summerCampSwimSettings={summerCampSwimSettings} />
          <VacationCampTabPanelContainer />
          <BeforeAfterSchoolTabPanelContainer />
          <YearCycleTabPanelContainer programYearCycleSetting={programYearCycleSetting} />
        </Tab.Panels>
      </div>
    </Tab.Group>
  )
}