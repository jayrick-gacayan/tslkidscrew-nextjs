import { Listbox, Transition } from "@headlessui/react";
import { Fragment, ReactNode, Ref, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { Fa6SolidCaretDown } from "./svg/fa6-solid-caret-down";
import { ValidationType } from "@/types/enums/validation-type";

type MyListboxProps = {
  name?: string;
  value: any;
  placeholder?: string;
  onChange: (value: any) => void;
  items: any[];
  by?: string;
  listButtonClassName?: string;
  labelText?: string;
  errorText?: string;
  validationStatus?: ValidationType;
  valueClassName?: (value: string, placeholder: string) => string;
  listboxDropdownIcon?: (open: boolean) => ReactNode;
  keyDescription: string;
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
    valueClassName,
    listboxDropdownIcon,
    keyDescription,
  }: MyListboxProps,
  ref: Ref<HTMLElement> | undefined
) {
  return (
    <div className="relative w-full">
      <Listbox ref={ref}
        value={value}
        onChange={onChange}
        by={by}
        name={name}>
        {
          ({ open, value }) => {
            let getValue = typeof value === 'string' ? (value !== '' ? value : placeholder) :
              value ? (value.email ?? value.name) : placeholder
            return (
              <>
                <div className="space-y-[2px]">
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
                  <Listbox.Button
                    className={
                      twMerge(
                        `transition-all delay-100 bg-secondary rounded text-left flex items-center gap-2 w-full justify-between p-2 cursor-pointer` +
                        ` ${open ? 'border-primary border' : ''}` +
                        ` ${validationStatus === ValidationType.ERROR ? 'border-danger bg-danger-light' : ''}`,
                        listButtonClassName!
                      )
                    }>
                    <div className={valueClassName ? valueClassName(getValue, placeholder ?? '') : ``}>
                      {getValue}
                    </div>
                    {listboxDropdownIcon && listboxDropdownIcon(open)}
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
                      className={
                        twMerge(
                          `absolute top-[115%] left-0 w-full bg-white z-[60] rounded drop-shadow` +
                          ` ${items.length < 6 ? `h-auto overflow-hidden` : `h-[240px] overflow-auto`}`
                        )}>
                      {items.map((value: any, index: any) => (
                        <Listbox.Option
                          as='div'
                          key={`${keyDescription}-${value}${index}`}
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