import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import BeforeAfterCurrentYearCyclePrice from "./before-after-current-year-cycle-price";
import BeforeAfterNextYearCyclePrice from "./before-after-next-year-cycle-price";

export default function BeforeAfterSchoolTabPanelContainer() {
  return (
    <Tab.Panel as='div' id="before-after-camp-panel">
      <div className="space-y-8  divide-y-2 divide-secondary-light">
        <BeforeAfterCurrentYearCyclePrice />
        <BeforeAfterNextYearCyclePrice />
      </div>
    </Tab.Panel>
  )
}