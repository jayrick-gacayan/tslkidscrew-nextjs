import { Combobox } from "@headlessui/react"
import { Icon } from "@iconify/react/dist/iconify.js"

export default function SearchSelect({
  value,
  placeholder,
  onChange,
  items,
  by
}: {
  value: any,
  placeholder: string;
  onChange: (value: any) => void;
  items: any[];
  by?: string
}) {
  return (
    <Combobox value={value} multiple={false} onChange={onChange} by={by}>
      <Combobox.Button
        as="div"
        className="bg-secondary rounded-full text-white flex items-center w-full justify-between p-2 relative">
        {
          ({ open, value }) => {
            let getValue = typeof value === 'string' ? (value !== '' ? value : placeholder) :
              value ? value.name : placeholder;

            return (
              <>
                <div className="p-2 text-tertiary">{getValue}</div>
                <div className="p-2 text-primary">
                  <Icon icon='fa6-solid:caret-down'
                    className={`transition-all duration-200 ${open ? '-rotate-90' : 'rotate-0'}`} />
                </div>
              </>
            )
          }
        }
      </Combobox.Button>

      <Combobox.Options as='div'
        className="absolute top-[110%] left-0 w-full bg-white z-[60] rounded drop-shadow overflow-hidden">
        {items.map((value: any, index: any) => (
          <Combobox.Option
            as='div'
            key={`show-entries-admin-users-${value}${index}`}
            className={({ selected, active }) => {
              return `p-2 hover:cursor-pointer hover:bg-primary hover:text-white ${selected ? 'bg-primary text-white' : 'bg-white text-black'}`
            }}
            value={value}>
            {typeof value === 'string' ? value : value.name}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  )
}