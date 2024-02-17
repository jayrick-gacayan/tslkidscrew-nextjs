import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import SummerCampSwimPrices from "./summer-camp-swim-prices";
import SummerCampWeekPrices from "./summer-camp-weeks-prices";
import SummerCampPromos from "./summer-camp-promos";

export default function SummerCampTabPanelContainer() {
  return (
    <Tab.Panel as={Fragment}>
      <div className="space-y-8 divide-y-2 divide-secondary-light">
        <SummerCampSwimPrices />
        <SummerCampWeekPrices />
        <SummerCampPromos />
      </div>
    </Tab.Panel>
  )
}