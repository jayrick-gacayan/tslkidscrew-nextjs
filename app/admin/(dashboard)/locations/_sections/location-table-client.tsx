'use client';

import { removeLocationPlaceAction } from "@/actions/location-actions";
import Fa6SolidEye from "@/app/_components/svg/fa6-solid-eye";
import { Fa6SolidPen } from "@/app/_components/svg/fa6-solid-pen";
import Fa6SolidSchoolCircleXmark from "@/app/_components/svg/fa6-solid-school-circle-xmark";
import { LocationPlace } from "@/models/location"
import { confirmSwalInfo } from "@/types/helpers/sweet-alert-helpers";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast, ToastContentProps } from "react-toastify";
import { SweetAlertResult } from "sweetalert2";

export default function LocationTableClient({ locationPlaces }: { locationPlaces: LocationPlace[] }) {
  const [dataLocationPlaces, setDataLocationPlaces] = useState(locationPlaces);
  const [locationPlaceId, setLocationPlaceId] = useState<any>(undefined);
  const [toastStatus, setToastStatus] = useState('none');

  useEffect(() => {
    if (toastStatus === 'closed') {
      if (locationPlaceId) {
        async function deleteLocationPlace() {
          await removeLocationPlaceAction(locationPlaceId)
        }
        deleteLocationPlace();
        setLocationPlaceId(undefined);
      }
      setToastStatus('none');
    }
  }, [
    toastStatus,
    locationPlaceId
  ]);

  useEffect(() => {
    setDataLocationPlaces(locationPlaces);
  }, [locationPlaces])

  const showSwal = async (locationPlace: LocationPlace) => {
    const { name, id } = locationPlace;

    let result: SweetAlertResult<any> = await confirmSwalInfo("Are you sure you want to delete", name!);

    if (result.isConfirmed) {
      setDataLocationPlaces(dataLocationPlaces.filter((dataLocationPlace: LocationPlace) => {
        return dataLocationPlace.id !== id
      }));

      setLocationPlaceId(locationPlace.id);
      toast((props: ToastContentProps<LocationPlace>) => {
        return (
          <div className="text-black flex gap-2">
            <div className="flex-1">{props.data.name} has been deleted from the locations list.</div>
          </div>
        )
      }, {
        data: locationPlace,
        toastId: `admin-locations-${id}`,
        type: 'success',
        hideProgressBar: true,
        onClose: (props) => { setToastStatus('closed') },
        onOpen: (props) => { setToastStatus('opened') }
      })
    }

  }

  return (
    <tbody>
      {
        dataLocationPlaces.map((locationPlace: LocationPlace, idx: number) => {
          return (
            <tr key={`locations-table-${locationPlace.name!}-${idx}`}
              className="bg-secondary [&>td]:px-3 [&>td]:py-2 [&>td]:text-center">
              <td className="w-56">{locationPlace.name ?? 'N/A'}</td>
              <td className="w-auto">{locationPlace.address ?? 'N/A'}</td>
              <td className="w-56">
                {locationPlace.director?.email ?? 'N?A'}
              </td>
              <td className="w-24">{locationPlace?.program_count ?? "N/A"}</td>
              <td className="w-40">{locationPlace.minimum_age!}</td>
              <td className="w-24">
                <div className="flex items-center justify-center gap-2 w-full">
                  <Link href={`/admin/locations/${locationPlace.id!}`}
                    className="text-primary block">
                    <Fa6SolidEye />
                  </Link>
                  <button onClick={async () => { await showSwal(locationPlace); }}
                    className="text-danger cursor-pointer disabled:cursor-not-allowed"
                    disabled={toastStatus === 'opened' || toastStatus === 'closed'}>
                    <Fa6SolidSchoolCircleXmark className="inline-block" />
                  </button>
                  <Link href={`/admin/locations/${locationPlace.id!}/edit`}
                    className="text-warning block">
                    <Fa6SolidPen />
                  </Link>
                </div>
              </td>
            </tr>
          )
        })
      }
    </tbody>
  )
}