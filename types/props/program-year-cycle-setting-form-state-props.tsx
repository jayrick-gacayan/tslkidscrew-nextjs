import { FormStateProps } from "./form-state-props";
import { InputProps } from "./input-props";

export interface ProgramYearCycleSettingFormStateProps extends FormStateProps {
  'current-year'?: InputProps<string>;
  'next-year'?: InputProps<string>;
}