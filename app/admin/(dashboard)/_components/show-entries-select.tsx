import { Fa6SolidChevronDown } from "@/app/_components/svg/fa6-solid-chevron-down";
import { Listbox, Transition } from "@headlessui/react"

export default function ShowEntriesSelect({
  value,
  onChange,
  items,
}: {
  value: any;
  onChange: (value: any) => void;
  items: any[];
}) {
  return (
    <div className="w-full flex sm:w-fit items-center gap-x-2">
      <div>Show</div>
      <div className="w-16">
        <div className="w-full relative text-sm">
          <Listbox value={value} onChange={onChange}>
            <Listbox.Button
              as="div"
              className="bg-primary rounded text-white flex items-center w-full justify-between">
              {
                ({ open }) => {
                  return (
                    <>
                      <div className="p-2">{value}</div>
                      <div className="p-2">
                        <Fa6SolidChevronDown className={`fill-white transition-all duration-200 ${open ? '-rotate-90' : 'rotate-0'}`} />
                      </div>
                    </>
                  )
                }
              }
            </Listbox.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Listbox.Options as='div'
                className="absolute top-[105%] z-50 left-0 w-full bg-white rounded drop-shadow overflow-hidden">
                {items.map((value: any, index: any) => (
                  <Listbox.Option
                    as='div'
                    key={`show-entries-admin-users-${value}${index}`}
                    className={({ selected, active }) => {
                      return `p-2 text-center hover:cursor-pointer hover:bg-primary hover:text-white ${selected ? 'bg-primary text-white' : 'bg-white text-black'}`
                    }}
                    value={value}>
                    {value}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </Listbox>
        </div>
      </div>
      <div>Entries</div>
    </div>
  )
}