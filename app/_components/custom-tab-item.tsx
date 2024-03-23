import { Tab } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export default function CustomTabItem({
  labelText,
  classNameTab
}: {
  labelText: string | ReactNode;
  classNameTab?: (selected: boolean) => string;
}) {

  function tabClassName(selected: boolean) {
    return `transition-all duration-100 cursor-pointer border-b-2 ${selected ? 'border-b-primary text-primary' : 'text-black border-b-secondary-light'} hover:bg-secondary-light flex-none w-auto py-3 px-4`
  }

  return (
    <Tab as={Fragment}>
      {
        ({ selected }) => {
          return (
            <div className={
              twMerge(
                tabClassName(selected),
                classNameTab && classNameTab(selected)
              )
            }>
              {labelText}
            </div>
          )
        }
      }
    </Tab>
  );
}