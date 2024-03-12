import { InputProps } from '@/types/props/input-props';
import { FormStateProps } from './form-state-props';

export interface LoginFormStateProps extends FormStateProps {
  email?: InputProps<string>;
  password?: InputProps<string>;
}