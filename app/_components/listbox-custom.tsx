import { Listbox, Transition } from "@headlessui/react";
import { Fragment, Ref, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { Fa6SolidCaretDown } from "./svg/fa6-solid-caret-down";
import { ValidationType } from "@/types/enums/validation-type";

type MyListboxProps = {
  name: string;
  value: any;
  placeholder: string;
  onChange: (value: any) => void;
  items: any[];
  by?: string;
  listButtonClassName?: string;
  labelText?: string;
  errorText?: string;
  validationStatus?: ValidationType;
}

function CustomListbox(
  {
    name,
    value,
    placeholder,
    onChange,
    items,
    by,
    listButtonClassName,
    labelText,
    errorText = '',
    validationStatus,
  }: MyListboxProps,
  ref: Ref<HTMLElement> | undefined
) {
  return (
    <div className="space-y-[2px] relative">
      <Listbox ref={ref}
        value={value}
        onChange={onChange}
        by={by}
        name={name}>
        {
          ({ open, value }) => {
            let getValue = typeof value === 'string' ? (value !== '' ? value : placeholder) :
              value ? (value.email ?? value.name) : placeholder;
            return (
              <>
                <div>
                  {
                    labelText &&
                    <Listbox.Label className={
                      twMerge(
                        "font-semibold text-black",
                        validationStatus === ValidationType.ERROR ? 'text-danger' : ''
                      )
                    }>
                      {labelText}
                    </Listbox.Label>
                  }
                  {/* <input type='hidden' name='location'
                value={typeof value === 'string' ? value : value ? value.id : ''}
                onChange={() => { return null; }} /> */}
                  <Listbox.Button
                    className={
                      twMerge(
                        `transition-all delay-100 bg-secondary rounded text-left flex items-center gap-2 w-full justify-between p-2 cursor-pointer` +
                        ` ${open ? 'border-primary border' : ''}` +
                        ` ${validationStatus === ValidationType.ERROR ? 'border-danger bg-danger-light' : ''}`,
                        listButtonClassName!
                      )
                    }>
                    <div className={`p-2 flex-1 ${getValue === placeholder ? 'text-secondary-light' : 'text-black'}`}>{getValue}</div>
                    <div className="p-2 text-tertiary">
                      <Fa6SolidCaretDown className={`text-[20px] transition-all duration-200 ${open ? '-rotate-90' : 'rotate-0'}`} />
                    </div>
                  </Listbox.Button>
                  {errorText !== '' && (<div className="text-danger">{errorText}</div>)}
                </div>
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
    </div>
  )
}

export default forwardRef(CustomListbox);