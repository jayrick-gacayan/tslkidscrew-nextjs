'use client';

import { ToastContainer } from "react-toastify";

export default function ToastComponentClient() {

  return (
    <ToastContainer
      toastClassName={(context) =>
        " bg-white flex p-1 rounded-md justify-between overflow-hidden cursor-pointer w-full shadow-lg"
      }
      bodyClassName={() => "flex-1 font-medium block p-3 w-full flex text-black"}
      autoClose={3000}
    />
  )
}