'use client'
import { ReactNode, useReducer } from "react";
import { FillInFormContext } from "./fill-in-form-context";
import { FillInFormContextTypes } from "./context-types";

const initialState: FillInFormContextTypes = {
  stripeModalOpen: false,
  numberOfChildren: 1,
};

const reducer = (state: FillInFormContextTypes, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case 'MODAL_TOGGLE':
      return {
        ...state,
        stripeModalOpen: !state.stripeModalOpen
      };
    case 'SET_NUMBER_OF_CHILD':
      return {
        ...state,
        numberOfChildren: action.payload
      }
    default:
      return state;
  }
};

export default function FillInFormProvider({
  children
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FillInFormContext.Provider value={{ state, dispatch }}>
      {children}
    </FillInFormContext.Provider>
  )
}