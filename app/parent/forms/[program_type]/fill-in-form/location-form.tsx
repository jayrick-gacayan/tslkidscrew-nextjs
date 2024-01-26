'use client';

import CustomListboxHeadless from "@/app/_components/custom-listbox-headless";
import { useState } from "react";

let locationItems = [
  {
    id: 1,
    name: 'Albany Daycare',
    programs: [
      { id: 1, name: "Day Care Tour", category: "Day Care" },
      { id: 2, name: "Day Care", category: "Day Care" },
      { id: 3, name: "Summer Camp Tour", category: "Summer Camp" },
    ]
  },
  {
    id: 2,
    name: 'Clifton Park',
    programs: [
      { id: 1, name: "Day Care Tour", category: "Day Care" },
      { id: 2, name: "Day Care", category: "Day Care" },
      { id: 3, name: "Summer Camp Tour", category: "Summer Camp" },
    ]
  },
  {
    id: 3,
    name: 'Delmar',
    programs: [
      { id: 1, name: "Day Care Tour", category: "Day Care" },
      { id: 2, name: "Day Care", category: "Day Care" },
      { id: 3, name: "Summer Camp Tour", category: "Summer Camp" },
    ]
  },
  {
    id: 4,
    name: 'East Greenbush-FUMC',
    programs: [
      { id: 1, name: "Day Care Tour", category: "Day Care" },
      { id: 2, name: "Day Care", category: "Day Care" },
      { id: 3, name: "Summer Camp Tour", category: "Summer Camp" },
    ],
  },
  {
    id: 5,
    name: 'Gardner Dickinson',
    programs: [
      { id: 1, name: "Day Care Tour", category: "Day Care" },
      { id: 2, name: "Day Care", category: "Day Care" },
      { id: 3, name: "Summer Camp Tour", category: "Summer Camp" },
    ]
  },
]

export default function LocationForm() {
  const [location, setLocation] = useState<any>(undefined);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-medium text-[36px] text-black">Pick A Location</h1>
      </div>
      <div className="w-full relative">
        <CustomListboxHeadless value={location}
          placeholder='Location'
          onChange={(value: any) => {
            setLocation(value)
          }}
          items={locationItems}
          by="id" />
      </div>
      <div className="w-fit ml-auto block space-x-4">
        <button className="p-2 text-danger rounded border border-danger">Cancel</button>
        <button className="p-2 bg-primary text-white rounded">Next</button>
      </div>
    </div>
  )
}