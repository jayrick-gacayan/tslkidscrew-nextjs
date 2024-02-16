'use client';

import Fa6SolidEye from "@/app/_components/svg/fa6-solid-eye";
import { Fa6SolidPen } from "@/app/_components/svg/fa6-solid-pen";
import Fa6SolidSchoolCircleXmark from "@/app/_components/svg/fa6-solid-school-circle-xmark";
import { LocationPlace } from "@/models/location"
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast, ToastContentProps } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function LocationTableClient({ locationPlaces }: { locationPlaces: LocationPlace[] }) {
  const [locationPlaceId, setLocationPlaceId] = useState<any>(undefined);
  const [toastStatus, setToastStatus] = useState('none');

  useEffect(() => {
    if (toastStatus === 'closed') {
      if (locationPlaceId) {
        async function locationPlaceDeleted() {

        }
        locationPlaceDeleted();
      }
      setToastStatus('none');
      setLocationPlaceId(undefined);
    }
  }, [toastStatus, locationPlaceId]);

  const showSwal = (locationPlace: LocationPlace) => {
    withReactContent(Swal).fire({
      html: (
        <div className="space-y-[4px] text-center font-semibold">
          <div className="text-[20px]">Are you sure you want to delete</div>
          <div className="text-[28px]">{locationPlace.name}?</div>
        </div>
      ),
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      customClass: {
        actions: 'flex gap-2',
        confirmButton: 'bg-primary text-white p-2 rounded',
        cancelButton: 'bg-danger text-white p-2 rounded',

      },
      showCancelButton: true,
      buttonsStyling: false,

    }).then((result) => {
      if (result.isConfirmed) {
        setLocationPlaceId(locationPlace.id)
        toast((props: ToastContentProps<LocationPlace>) => {
          return (
            <div className="text-black flex gap-2">
              <div className="flex-1">{props.data.name} has been deleted from the locations list.</div>
              <div className="underline text-primary"
                onClick={() => {
                  setLocationPlaceId(null);
                  props.closeToast();
                }}>
                Undo
              </div>
            </div>
          )
        }, {
          data: locationPlace,
          toastId: `admin-${locationPlace.id}`,
          type: 'success',
          hideProgressBar: true,
          onClose: (props) => {
            setToastStatus('closed')
            // console.log('close props', props)
          },
          onOpen: (props) => {
            setToastStatus('opened')
            // console.log('open props', props)
          }
        })
      }
    });
  }

  return (
    <tbody>
      {
        locationPlaces.map((locationPlace: LocationPlace, idx: number) => {
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
                  <button onClick={() => { showSwal(locationPlace); }}
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