'use client';

import { useFormState } from "react-dom";
import { createContext } from "react";

type Context = {
  state: { count: number },
  formAction: () => void;
}

export const SampleContext = createContext<Context>({} as Context);

export default function FormActionsProviders(props: any) {
  const [state, formAction] = useFormState(props.sampleFormAction, { count: 0 });

  return (
    <SampleContext.Provider value={{ state, formAction }}>
      {props.children}
    </SampleContext.Provider>
  )
}