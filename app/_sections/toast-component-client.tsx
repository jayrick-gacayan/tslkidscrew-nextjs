'use client';

import { ToastContainer } from "react-toastify";

export default function ToastComponentClient() {

  const contextClass = {
    success: "bg-success",
    error: "bg-danger",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-primary",
    // dark: "bg-white-600 font-gray-300",
  };
  return (
    <ToastContainer
      toastClassName={(context) =>
        // contextClass[context?.type || "default"] +
        " bg-white flex p-1 rounded-md justify-between overflow-hidden cursor-pointer w-full shadow-lg"
      }
      bodyClassName={() => "flex-1 font-medium block p-3 w-full flex text-black"}

      autoClose={3000}
    />
  )
}