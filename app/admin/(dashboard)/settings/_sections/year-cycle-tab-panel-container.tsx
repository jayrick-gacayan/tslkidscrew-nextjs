'use client';

import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import UpdateYearCycle from "./update-year-cycle";
import { ProgramYearCycleSetting } from "@/models/program-year-cycle-setting";

export default function YearCycleTabPanelContainer({
  programYearCycleSetting
}: {
  programYearCycleSetting: ProgramYearCycleSetting;
}) {
  return (
    <Tab.Panel as={Fragment}>
      <div className="space-y-8">
        <UpdateYearCycle />
      </div>
    </Tab.Panel>
  )
}