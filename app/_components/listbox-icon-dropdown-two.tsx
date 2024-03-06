import { Fa6SolidChevronDown } from "./svg/fa6-solid-chevron-down";

export default function ListboxIconDropdownTwo({ open }: { open: boolean }) {
  return (
    <div className="p-2">
      <Fa6SolidChevronDown className={`fill-white transition-all duration-200 ${open ? '-rotate-90' : 'rotate-0'}`} />
    </div>
  )
}