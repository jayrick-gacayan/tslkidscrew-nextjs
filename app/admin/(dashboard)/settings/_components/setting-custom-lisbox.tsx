import { Fa6SolidChevronDown } from "@/app/_components/svg/fa6-solid-chevron-down";
import { Listbox, Transition } from "@headlessui/react";
import { capitalCase, noCase } from "change-case";
import { Ref, forwardRef } from "react";

export type SettingListboxCustomProps = {
  listboxData: any;
  onChangeListbox: (value: any) => void;
  items: any[];
  keyDescription: string;
  by?: string
}

function SettingListboxCustom({
  listboxData,
  onChangeListbox,
  items,
  keyDescription,
  by
}: SettingListboxCustomProps,
  ref: Ref<HTMLElement> | undefined
) {
  return (
    <div className="relative w-full">
      <Listbox ref={ref}
        value={listboxData}
        onChange={onChangeListbox}
        by={by}>
        <Listbox.Button as="div"
          className="bg-primary rounded text-white flex items-center w-full justify-between">
          {
            ({ open }) => {
              return (
                <>
                  <div className="px-3 py-2">{capitalCase(noCase(listboxData))}</div>
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
            {
              items.map((value: any, index: any) => (
                <Listbox.Option as='div'
                  key={`${keyDescription}-${value}${index}`}
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
  )
}

export default forwardRef(SettingListboxCustom);