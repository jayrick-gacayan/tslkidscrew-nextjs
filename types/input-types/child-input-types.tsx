import { InputProps } from '../props/input-props';

export type ChildInputTypes = {
  first_name: InputProps<string>;
  last_name: InputProps<string>;
  birthdate: string | undefined;
  school_attending: InputProps<string>;
}