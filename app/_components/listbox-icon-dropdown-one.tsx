import Fa6SolidCaretDown from "./svg/fa6-solid-caret-down";

export default function ListboxIconDropdownOne({ open }: { open: boolean }) {
  return (
    <div className="p-2 text-tertiary">
      <Fa6SolidCaretDown className={`text-[20px] transition-all duration-200 ${open ? '-rotate-90' : 'rotate-0'}`} />
    </div>
  )
}