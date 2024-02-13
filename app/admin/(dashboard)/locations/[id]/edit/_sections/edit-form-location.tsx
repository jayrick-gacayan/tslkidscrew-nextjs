'use client';

import CustomListboxHeadless from "@/app/_components/custom-listbox-headless";
import InputCustom from "@/app/_components/input-custom";
import { LocationPlace } from "@/models/location";
import { useState } from "react";

let directorItems = [
  { id: 1, email: "alexisLarose.tsl@gmail.com" },
  { id: 2, email: "jake.tsl@gmail.com" },
  { id: 3, email: "missmaria.tsl@gmail.com" },
  { id: 4, email: "rhay26.tsl@gmail.com" },
  { id: 5, email: "peter.harding.tsl@gmail.com" },
];

export function EditFormLocation({
  locationPlace
}: {
  locationPlace: LocationPlace
}) {
  const [director, setDirector] = useState<any>(undefined);

  return (
    <>
      <div className="space-y-4">
        <InputCustom labelText='Name'
          id='location-name'
          type="text"
          name="name"
          className="bg-secondary border-0"
          placeholder="Name:"
          value={locationPlace.name!} />
        <InputCustom labelText='Address'
          id='location-address'
          type="text"
          name="address"
          className="bg-secondary border-0"
          placeholder="Address:"
          value={locationPlace.address!} />
        <div className="space-y-[2px] relative">
          <p className="font-semibold text-black">Director</p>
          <CustomListboxHeadless value={director}
            placeholder='Director'
            onChange={(value: any) => {
              setDirector(value)
            }}
            items={directorItems} />
        </div>
        <InputCustom labelText='Minimum Age For Children'
          id='location-minimum-age-for-children'
          type="text"
          name="location-minimum-age"
          className="bg-secondary border-0"
          placeholder="Minimum Age:"
          value={locationPlace.minimum_age!} />
      </div>
      <div className="w-1/2 block m-auto">
        <button className="bg-primary p-2 rounded text-white w-fit block m-auto">Submit</button>
      </div>
    </>
  )
}