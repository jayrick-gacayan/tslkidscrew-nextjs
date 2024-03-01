'use client'

import { ReactNode, useMemo, useReducer } from "react";
import { FillInFormContext } from "./fill-in-form-context";
import { fillInFormReducer } from "./fill-in-form-reducer";

const initialState = {
  stripeModalOpen: false,
  numberOfChildren: 1,
};

export default function FillInFormProvider({
  children
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(fillInFormReducer, initialState);
  const value = useMemo(() => { return [state, dispatch] }, [state]);

  return (
    <FillInFormContext.Provider value={value}>
      {children}
    </FillInFormContext.Provider>
  )
}