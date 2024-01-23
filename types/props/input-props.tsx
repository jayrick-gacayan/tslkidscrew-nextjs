import { ValidationType } from "../enums/validation-type";

export interface InputProps<T> {
  value: T,
  errorText: string;
  validationStatus: ValidationType;
}