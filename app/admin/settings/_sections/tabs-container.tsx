'use client';

import { Tab } from "@headlessui/react";
import CustomTabItem from "../../../_components/custom-tab-item";
import SummerCampTabPanelContainer from "./summer-camp-tab-panel-container";
import { Fragment } from "react";
import VacationCampTabPanelContainer from "./vacation-camp-tab-panel-container";
import BeforeAfterSchoolTabPanelContainer from "./before-after-school-tab-panel-container";

export default function TabsContainer() {

  return (
    <Tab.Group as={Fragment}>
      <div className='space-y-8 w-full'>
        <div className="overflow-auto pb-4 sm:pb-0">
          <div className='flex items-center flex-nowrap'>
            <CustomTabItem labelText='Summer Camp' />
            <CustomTabItem labelText='Vacation Camp' />
            <CustomTabItem labelText='Before and After School' />
          </div>
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