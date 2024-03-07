'use client'

import { ReactNode, useMemo, useReducer } from "react";
import { FillInFormContext } from "./fill-in-form-context";
import { fillInFormReducer } from "./fill-in-form-reducer";
import { ChildrenInfoType } from "@/types/input-types/children-info-input-types";
import { fieldInputValue } from "@/types/helpers/field-input-value";
import { LocationPlace } from "@/models/location";

let today = new Date();
let defaultDate = new Date(new Date(today.getFullYear() - 5, today.getMonth(), today.getDate()))

export const initChildren: ChildrenInfoType = {
  first_name: '',
  last_name: '',
  birthdate: defaultDate,
  school_attending: ''
}

export const fillInFormInitState = {
  stripeModalOpen: false,
  fillInForm: {
    location: fieldInputValue<LocationPlace | undefined>(undefined),
    children: [
      initChildren
    ],

    //for program type before-or-after-school
    yearCycle: fieldInputValue<string>(''),
    startDate: fieldInputValue<Date | undefined>(today),
    beforeOrAfterWeekDays: fieldInputValue({
      beforeSchool: [],
      afterSchool: []
    }),
    TOSCheckError: ''
  }
};

export default function FillInFormProvider({
  children
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(fillInFormReducer, fillInFormInitState);
  const value = useMemo(() => { return [state, dispatch] }, [state]);

  return (
    <FillInFormContext.Provider value={value}>
      {children}
    </FillInFormContext.Provider>
  )
}