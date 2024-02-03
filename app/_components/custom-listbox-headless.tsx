import { Listbox, Transition } from "@headlessui/react"
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";
import { Fa6SolidCaretDown } from "./svg/fa6-solid-caret-down";

export default function CustomListboxHeadless({
  value,
  placeholder,
  onChange,
  items,
  by,
  listButtonClassName,
}: {
  value: any,
  placeholder: string;
  onChange: (value: any) => void;
  items: any[];
  by?: string;
  listButtonClassName?: string;
}) {
  return (
    <Listbox value={value} onChange={onChange} by={by}>
      {
        ({ open, value }) => {
          let getValue = typeof value === 'string' ? (value !== '' ? value : placeholder) :
            value ? (value.email ?? value.name) : placeholder;

          return (
            <>
              <input type='hidden' name='location'
                value={typeof value === 'string' ? value : value ? value.id : ''}
                onChange={() => { return null; }} />
              <Listbox.Button
                as="div"
                className={
                  twMerge(`bg-secondary rounded flex items-center w-full justify-between p-2 cursor-pointer`,
                    listButtonClassName!
                  )
                }>
                <div className={`p-2 ${getValue === placeholder ? 'text-secondary-light' : 'text-black'}`}>{getValue}</div>
                <div className="p-2 text-white">
                  <Fa6SolidCaretDown className={`transition-all duration-200 ${open ? '-rotate-90' : 'rotate-0'}`} />
                </div>
              </Listbox.Button>

              <Transition show={open}
                as={Fragment}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0">
                <Listbox.Options as={Fragment}>
                  <div
                    className="absolute top-[115%] left-0 w-full bg-white z-[60] rounded drop-shadow overflow-hidden">
                    {items.map((value: any, index: any) => (
                      <Listbox.Option
                        as='div'
                        key={`show-entries-admin-users-${value}${index}`}
                        className={({ selected, active }) => {
                          return `p-2 hover:cursor-pointer hover:bg-primary hover:text-white ${selected ? 'bg-primary text-white' : 'bg-white text-black'}`
                        }}
                        value={value}>
                        {typeof value === 'string' ? value : (value.email ?? value.name)}
                      </Listbox.Option>
                    ))}
                  </div>
                </Listbox.Options>

              </Transition>
            </>
          )
        }
      }
    </Listbox>
  )
}