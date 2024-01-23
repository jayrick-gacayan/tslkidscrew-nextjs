'use client';

import { Icon } from "@iconify/react/dist/iconify.js";

export default function LocationsTable() {
  return (
    <div className="block overflow-auto rounded bg-secondary h-96">
      <table className="min-w-[768px] w-full">
        <thead>
          <tr className="bg-secondary-light [&>th]:text-sm [&>th]:font-medium [&>th]:px-3 [&>th]:py-2">
            <th className="w-56">NAME</th>
            <th className="w-auto">ADDRESS</th>
            <th className="w-56">PRIMARY DIRECTOR</th>
            <th className="w-24">PROGRAMS</th>
            <th className="w-40">MINIMUM AGE</th>
            <th className="w-24">ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-secondary [&>td]:px-3 [&>td]:py-2 [&>td]:text-center">
            <td className="w-56">Kath Doe</td>
            <td className="w-auto">Guilderland School House Road</td>
            <td className="w-56">qwerty@gmail.com</td>
            <td className="w-24">3</td>
            <td className="w-40">1</td>
            <td className="w-24">
              <div className="flex items-center justify-center gap-2 w-full">
                <div className="text-primary">
                  <Icon icon='fa6-solid:eye' />
                </div>
                <div className="text-amber-300">
                  <Icon icon='fa6-solid:pen' />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}