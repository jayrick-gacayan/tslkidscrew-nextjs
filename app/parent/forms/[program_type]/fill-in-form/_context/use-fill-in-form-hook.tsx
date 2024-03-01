import { useContext } from "react"
import { FillInFormContext } from "./fill-in-form-context";

export function useFillInFormHook() {
  const context = useContext<any>(FillInFormContext);

  if (!context) {
    throw new Error(`useFillInFormHook must be used within a AdminUserProvider`)
  }

  const [state, dispatch] = context;

  function stripeModalToggle() {
    dispatch({ type: 'STRIPE_MODAL_TOGGLE' })
  }

  function setNumberOfChild(type: number) {
    dispatch({ type: 'SET_NUMBER_OF_CHILD', payload: type });
  }


  return {
    state,
    dispatch,
    stripeModalToggle,
    setNumberOfChild,
  }
}