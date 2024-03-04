import { useContext } from "react"
import { FillInFormContext } from "./fill-in-form-context";
import { LocationPlace } from "@/models/location";

export function useFillInFormHook() {
  const context = useContext<any>(FillInFormContext);

  if (!context) {
    throw new Error(`useFillInFormHook must be used within a AdminUserProvider`)
  }

  const [state, dispatch] = context;

  function stripeModalToggle() {
    dispatch({ type: 'STRIPE_MODAL_TOGGLE' })
  }

  function setLocation(location: Partial<LocationPlace> | undefined) {
    dispatch({ type: 'SET_LOCATION', payload: location })
  }

  function resetForm() {
    dispatch({ type: 'RESET_FORM' })
  }

  function changeFirstname(idx: number, value: string) {
    dispatch({
      type: 'CHANGE_FIRST_NAME', payload: { idx, value }
    })
  }

  function changeLastname(idx: number, value: string) {
    dispatch({
      type: 'CHANGE_LAST_NAME', payload: { idx, value }
    })
  }

  function changeBirthdate(idx: number, value: any) {
    dispatch({
      type: 'CHANGE_BIRTHDATE', payload: { idx, value }
    })
  }

  function changeSchoolAttending(idx: number, value: string) {
    dispatch({
      type: 'CHANGE_SCHOOL_ATTENDING', payload: { idx, value }
    })
  }

  function addChildren() {
    dispatch({ type: 'ADD_CHILDREN' })
  }

  function removeChildren(idx: number) {
    dispatch({ type: 'REMOVE_CHILDREN', payload: idx })
  }

  return {
    state,
    dispatch,
    stripeModalToggle,
    setLocation,
    resetForm,
    changeFirstname,
    changeLastname,
    changeSchoolAttending,
    addChildren,
    removeChildren,
    changeBirthdate
  }
}