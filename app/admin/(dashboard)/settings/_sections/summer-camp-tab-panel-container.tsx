import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import SummerCampSwimPrices from "./summer-camp-swim-prices";
import SummerCampWeekPrices from "./summer-camp-weeks-prices";
import SummerCampPromos from "./summer-camp-promos";
import SummerCampWeekPricesProvider from "./summer-camp-week-prices-provider";
import { SummerCampWeekSetting } from "@/models/summer-week-setting";

export default function SummerCampTabPanelContainer({
  summerWeekPrices
}: {
  summerWeekPrices: SummerCampWeekSetting[]
}) {
  return (
    <Tab.Panel as={Fragment}>
      <div className="space-y-8 divide-y-2 divide-secondary-light">
        <SummerCampSwimPrices />
        <SummerCampWeekPricesProvider summerCampWeekSettings={summerWeekPrices}>
          <SummerCampWeekPrices />
        </SummerCampWeekPricesProvider>

        <SummerCampPromos />
      </div>
    </Tab.Panel >
  )
}