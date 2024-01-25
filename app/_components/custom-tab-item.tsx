import { Tab } from "@headlessui/react";
import { Fragment, ReactNode } from "react";

export default function CustomTabItem({
  labelText
}: {
  labelText: string | ReactNode
}) {
  function tabClassName(selected: boolean) {
    return `cursor-pointer border-b-2 ${selected ? 'border-b-primary text-primary' : 'text-black border-b-secondary-light'} py-3 px-4`
  }
  return (
    <Tab as={Fragment}>
      {
        ({ selected }) => {
          return (
            <div className={tabClassName(selected)}>
              {labelText}
            </div>
          )
        }
      }
    </Tab>
  );
}