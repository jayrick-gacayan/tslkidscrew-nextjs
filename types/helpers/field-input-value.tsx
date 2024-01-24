import { ValidationType } from "../enums/validation-type";
import { InputProps } from "../props/input-props";

export function fieldInputValue<T>(value: T): InputProps<T> {
  return {
    value: value,
    errorText: '',
    validationStatus: ValidationType.NONE,
  }
}