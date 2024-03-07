import { useContext } from "react"
import { FillInFormContext } from "./fill-in-form-context";
import { LocationPlace } from "@/models/location";
import { InputProps } from "@/types/props/input-props";
import { ValidationType } from "@/types/enums/validation-type";

export function useFillInFormHook() {
  const context = useContext<any>(FillInFormContext);

  if (!context) {
    throw new Error(`useFillInFormHook must be used within a FillInFormProvider`)
  }

  const [state, dispatch] = context;

  function stripeModalToggle() {
    dispatch({ type: 'STRIPE_MODAL_TOGGLE' })
  }

  function setLocation(inputProps: InputProps<LocationPlace | undefined>) {
    dispatch({ type: 'SET_LOCATION', payload: inputProps })
  }

  function resetForm() {
    dispatch({ type: 'RESET_FORM' })
  }

  function changeFirstname(idx: number, value: string) {
    console.log('idx', idx, value)
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

  function setTOSError(error: string) {
    dispatch({ type: 'SET_TOS_ERROR', payload: error })
  }

  /* This is for program type before-or-after-school */
  function setYearCycle(inputProps: InputProps<string>) {
    dispatch({ type: 'SET_YEAR_CYCLE', payload: inputProps })
  }

  function setWeekDayBOAS(inputProps: { type: string, value: any }) {
    dispatch({ type: 'SET_WEEK_DAY_BOAS', payload: inputProps })
  }

  function setStartDate(inputProps: InputProps<Date | undefined>) {
    dispatch({ type: 'SET_START_DATE', payload: inputProps })
  }

  function setWeekDayBOASError(inputProps:
    {
      errorText: string;
      validationStatus: ValidationType
    }) {
    dispatch({ type: 'SET_WEEK_DAY_BOAS_ERROR', payload: inputProps })
  }

  /* This is for program type before-or-after-school */

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
    changeBirthdate,
    setTOSError,

    //for program type before-or-after-school
    setYearCycle,
    setWeekDayBOAS,
    setStartDate,
    setWeekDayBOASError,

  }
}