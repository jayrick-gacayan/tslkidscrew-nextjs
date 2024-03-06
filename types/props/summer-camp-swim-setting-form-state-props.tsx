import { FormStateProps } from "./form-state-props";
import { InputProps } from "./input-props";
export interface SummerCampSwimSettingFormStateProps extends FormStateProps {
  ['summer-camp-swim-price']?: InputProps<string>;
}