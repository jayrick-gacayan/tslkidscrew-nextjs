import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import SummerCampSwimPrices from "./summer-camp-swim-prices";
import SummerCampWeekPrices from "./summer-camp-weeks-prices";
import SummerCampPromos from "./summer-camp-promos";
import { SummerCampWeekSetting } from "@/models/summer-camp-week-setting";
import { SummerCampSwimSetting } from "@/models/summer-camp-swim-setting";

export default function SummerCampTabPanelContainer({
  summerCampWeekSettings,
  summerCampSwimSettings,
  summerCampPromoSettings,
}: {
  summerCampWeekSettings: SummerCampWeekSetting[];
  summerCampSwimSettings: SummerCampSwimSetting[];
  summerCampPromoSettings: SummerCampWeekSetting[];
}) {
  return (
    <Tab.Panel as='div' tabIndex={-1}>
      <div className="space-y-8 divide-y-2 divide-secondary-light">
        <SummerCampSwimPrices summerCampSwimSettings={summerCampSwimSettings} />
        <SummerCampWeekPrices summerCampWeekSettings={summerCampWeekSettings} />
        <SummerCampPromos summerCampPromoSettings={summerCampPromoSettings} />
      </div>
    </Tab.Panel>
  )
}