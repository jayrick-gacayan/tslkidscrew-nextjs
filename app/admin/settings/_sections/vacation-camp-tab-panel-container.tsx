import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import VacationCampSchedules from "./vacation-camp-schedules";

export default function VacationCampTabPanelContainer() {
  return (
    <Tab.Panel as={Fragment}>
      <div className="space-y-8">
        <VacationCampSchedules />
      </div>
    </Tab.Panel>
  )
}