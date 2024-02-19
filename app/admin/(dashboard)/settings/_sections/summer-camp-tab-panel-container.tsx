import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import SummerCampSwimPrices from "./summer-camp-swim-prices";
import SummerCampWeekPrices from "./summer-camp-weeks-prices";
import SummerCampPromos from "./summer-camp-promos";
import SummerCampWeekPricesProvider from "./summer-camp-week-prices-provider";
import { SummerCampWeekSetting } from "@/models/summer-camp-week-setting";
import { SummerCampSwimSetting } from "@/models/summer-camp-swim-setting";

export default function SummerCampTabPanelContainer({
  summerCampWeekSettings,
  summerCampSwimSettings,
}: {
  summerCampWeekSettings: SummerCampWeekSetting[];
  summerCampSwimSettings: SummerCampSwimSetting[];
}) {
  return (
    <Tab.Panel as={Fragment}>
      <div className="space-y-8 divide-y-2 divide-secondary-light">
        <SummerCampSwimPrices summerCampSwimSettings={summerCampSwimSettings} />
        <SummerCampWeekPricesProvider summerCampWeekSettings={summerCampWeekSettings}>
          <SummerCampWeekPrices />
        </SummerCampWeekPricesProvider>

        <SummerCampPromos />
      </div>
    </Tab.Panel >
  )
}