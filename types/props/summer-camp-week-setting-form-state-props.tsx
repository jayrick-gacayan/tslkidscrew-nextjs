import { FormStateProps } from "./form-state-props";
import { InputProps } from "./input-props";

export interface SummerCampWeekSettingFormStateProps extends FormStateProps {
  ['week-name']?: InputProps<string>;
  ['week-capacity']?: InputProps<string>;
  ['week-start-date']?: string;
  ['week-notes']?: string;
}