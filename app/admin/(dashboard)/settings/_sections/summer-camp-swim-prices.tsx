'use client';

import InputCustom from "@/app/_components/input-custom";
import { Fa6SolidChevronDown } from "@/app/_components/svg/fa6-solid-chevron-down";
import { Listbox, Transition } from "@headlessui/react";
import { capitalCase, noCase } from "change-case";
import { useCallback, useState } from "react";

export default function SummerCampSwimPrices() {
  const [withSwim, setWithSwim] = useState<string>('with-swimming-rates');

  const cbTableHeader = useCallback(() => {
    let length = withSwim.length;
    return noCase(withSwim.substring(0, length - 6));
  }, [withSwim]);

  let weeksSwimArray = Array.from({ length: 5 }, (value, index) => { return index + 1; })
    .reverse();

  return (
    <div className="space-y-4">
      <div className="flex sm:flex-row flex-col items-start gap-2 sm:items-center">
        <div className="flex-1">
          <h1 className="font-medium text-[24px] text-black">Prices</h1>
        </div>
        <div className="flex-none relative">
          <Listbox value={withSwim} onChange={(value: string) => { setWithSwim(value); }}>
            <Listbox.Button
              as="div"
              className="bg-primary rounded text-white flex items-center w-full justify-between">
              {
                ({ open }) => {
                  return (
                    <>
                      <div className="px-3 py-2">{capitalCase(noCase(withSwim))}</div>
                      <div className="px-3 py-2">
                        <Fa6SolidChevronDown className={`fill-white transition-all duration-200 ${open ? '-rotate-90' : 'rotate-0'}`} />
                      </div>
                    </>
                  )
                }
              }
            </Listbox.Button>
            <Transition enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0">
              <Listbox.Options as='div'
                className="absolute top-[105%] left-0 w-full bg-white rounded drop-shadow overflow-hidden">
                {['with-swimming-rates', 'without-swimming-rates'].map((value: any, index: any) => (
                  <Listbox.Option
                    as='div'
                    key={`show-swimming-rates-summer-camps-${value}${index}`}
                    className={({ selected, active }) => {
                      return `px-3 py-2 hover:cursor-pointer hover:bg-primary hover:text-white ${selected ? 'bg-primary text-white' : 'bg-white text-black'}`
                    }}
                    value={value}>
                    {capitalCase(noCase(value))}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </Listbox>
        </div>
      </div>
      <div className="block overflow-auto">
        <table className="min-w-[1024px] w-full">
          <thead>
            <tr className="[&>th]:font-medium [&>th]:text-black [&>th]:px-2 [&>th]:py-3 [&>th]:bg-secondary-light">
              <th className="w-56">Name</th>
              {
                weeksSwimArray.map((value) => {
                  return (
                    <th key={`prices-${withSwim}-${value}`} className="capitalize">
                      {value} Weeks or More {cbTableHeader()} Trip
                    </th>
                  );
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              [1, 2, 3].map((childValue) => {
                return (
                  <tr key={`prices-${withSwim}-${childValue}`}
                    className="[&>td]:font-medium [&>td]:text-black [&>td]:text-center [&>td]:px-2 [&>td]:py-3 [&>td]:bg-secondary">
                    <td className="w-56">Children #{childValue}</td>
                    {
                      weeksSwimArray.map((value) => {
                        return (
                          <td key={`prices-${withSwim}-${childValue}-${value}`} className="capitalize">
                            <InputCustom type="text"
                              inputMode="numeric"
                              className="bg-white text-center border-transparent" />
                          </td>
                        );
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )

}