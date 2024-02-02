'use client';

import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import UpdateYearCycle from "./update-year-cycle";

export default function YearCycleTabPanelContainer() {
  return (
    <Tab.Panel as={Fragment}>
      <div className="space-y-8">
        <UpdateYearCycle />
      </div>
    </Tab.Panel>
  )
}