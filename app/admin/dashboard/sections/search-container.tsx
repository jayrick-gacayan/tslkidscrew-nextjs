'use client';

import { useState } from "react";
import SearchSelect from "../_components/search-select";

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

let types = ['Before/After School', 'Summer Camp', 'Vacation Camp']


export default function SearchContainer() {
  const [location, setLocation] = useState<any>(undefined);
  const [locProg, setLocProg] = useState<any>(undefined);
  const [type, setType] = useState<string>('');

  return (
    <div className="w-full lg:w-8/12 m-auto block space-y-8">
      <h1 className="font-medium text-[40px] text-center">Welcome to Admin</h1>
      <div className="space-y-4">
        <div className="w-full relative">
          <SearchSelect value={location} items={locationItems} onChange={setLocation} placeholder="Location" by="id" />
        </div>
        {
          location &&
          (
            <div className="w-full relative">
              <SearchSelect value={locProg}
                items={
                  locationItems.find((value: any) => {
                    return value.id === location.id
                  })?.programs ?? []
                }
                onChange={setLocProg}
                placeholder="Location Program"
                by="id" />
            </div>
          )
        }
        {
          locProg &&
          (
            <div className="w-full relative">
              <SearchSelect value={type}
                items={types}
                onChange={setType}
                placeholder="Program" />
            </div>
          )
        }
        <button type='button'
          className="w-48 m-auto block p-2 bg-primary text-white rounded-full disabled:cursor-not-allowed disabled:bg-secondary-light"
          disabled={!location || !locProg}>
          Search
        </button>
      </div>
    </div>
  )
}