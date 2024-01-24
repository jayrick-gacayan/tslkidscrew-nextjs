'use client';

import { Tab } from "@headlessui/react";
import SettingsTabItem from "../_components/settings-tab-item";
import SummerCampTabPanelContainer from "./summer-camp-tab-panel-container";
import { Fragment } from "react";
import VacationCampTabPanelContainer from "./vacation-camp-tab-panel-container";
import BeforeAfterSchoolTabPanelContainer from "./before-after-school-tab-panel-container";

export default function TabsContainer() {

  return (
    <Tab.Group as={Fragment}>
      <div className='space-y-8 w-full'>
        <div className='flex items-center flex-nowrap w-full'>
          <SettingsTabItem labelText='Summer Camp' />
          <SettingsTabItem labelText='Vacation Camp' />
          <SettingsTabItem labelText='Before and After School' />
        </div>
        <Tab.Panels as={Fragment}>
          <SummerCampTabPanelContainer />
          <VacationCampTabPanelContainer />
          <BeforeAfterSchoolTabPanelContainer />
        </Tab.Panels>
      </div>
    </Tab.Group>
  )
}