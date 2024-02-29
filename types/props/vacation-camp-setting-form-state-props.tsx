import { FormStateProps } from "./form-state-props";
import { InputProps } from "./input-props";

export interface VacationCampSettingFormStateProps extends FormStateProps {
  'vacation-camp-name'?: InputProps<string>;
  'vacation-camp-capacity'?: InputProps<string>;
  'vacation-camp-dates'?: InputProps<string>;
}