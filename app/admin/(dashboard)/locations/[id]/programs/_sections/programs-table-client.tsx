'use client';

import { removeProgramAction } from "@/actions/location-program-actions";
import Fa6SolidEye from "@/app/_components/svg/fa6-solid-eye";
import { Fa6SolidPen } from "@/app/_components/svg/fa6-solid-pen";
import Fa6SolidTrashCan from "@/app/_components/svg/fa6-solid-trash-can";
import { LocationProgram } from "@/models/location-program";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContentProps, toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function ProgramsTableClient({
  location_id,
  programs
}: {
  location_id: string;
  programs: LocationProgram[];
}) {
  const [dataPrograms, setDataPrograms] = useState(programs);
  const [programId, setProgramId] = useState<any>(undefined);
  const [toastStatus, setToastStatus] = useState('none');

  useEffect(() => {
    setDataPrograms(programs)
  }, [programs]);

  useEffect(() => {
    switch (toastStatus) {
      case 'closed':
        if (programId) {
          async function deleteProgram() {
            await removeProgramAction(location_id, programId);
          }
          deleteProgram();
          setProgramId(undefined);
        }

        setToastStatus('none');
        break;
    }
  }, [toastStatus, programId]);

  const showSwal = (program: LocationProgram) => {
    const { id, name_suffix } = program
    withReactContent(Swal).fire({
      html: (
        <div className="space-y-[4px] text-center font-semibold">
          <div className="text-[20px]">Are you sure you want to delete the program</div>
          <div className="text-[28px]">{name_suffix!}</div>
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
        setDataPrograms(dataPrograms.filter((dataProgram: LocationProgram) => {
          return dataProgram.id !== id
        }));
        setProgramId(id)
        toast((props: ToastContentProps<LocationProgram>) => {
          return (
            <div className="text-black flex gap-2">
              <div className="flex-1">{props.data.name} has been deleted from the programs list.</div>
              <div className="underline text-primary"
                onClick={() => {
                  setDataPrograms(programs);
                  setProgramId(undefined);
                  props.closeToast();
                }}>
                Undo
              </div>
            </div>
          )
        }, {
          data: program,
          toastId: `program-${id}`,
          type: 'success',
          hideProgressBar: true,
          onClose: (props) => { setToastStatus('closed') },
          onOpen: (props) => { setToastStatus('opened') }
        })
      }
    });
  }

  return (
    <tbody>
      {
        dataPrograms.map((locationProgram: LocationProgram, index: number) => {
          let activeProgram = locationProgram.active === undefined || locationProgram.active ?
            'Active' : 'Inactive';
          return (
            <tr key={`location-program-${locationProgram.id}-${index}-${locationProgram.name}`}
              className="bg-secondary [&>td]:px-3 [&>td]:py-2 [&>td]:text-center">
              <td className="w-auto">{locationProgram.name!}</td>
              <td className="w-48">{locationProgram.name_suffix === '' ? 'N/A' : locationProgram.name_suffix}</td>
              <td className="w-72">rhay26.tsl@gmail.com</td>
              <td className="w-24">
                {activeProgram}
              </td>
              <td className="w-40">{locationProgram.capacity ?? 1}</td>
              <td className="w-40">12</td>
              <td className="w-24">
                <div className="flex items-center justify-center gap-2 w-full">
                  <Link href={`/admin/locations/${location_id}/programs/${locationProgram.id!}`}
                    className="text-primary block">
                    <Fa6SolidEye />
                  </Link>
                  <button onClick={() => { showSwal(locationProgram); }}
                    className='text-danger cursor-pointer disabled:cursor-not-allowed'
                    disabled={toastStatus === 'opened' || toastStatus === 'closed'}>
                    <Fa6SolidTrashCan />
                  </button>
                  <Link href={`/admin/locations/${location_id}/programs/${locationProgram.id!}/edit`}
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