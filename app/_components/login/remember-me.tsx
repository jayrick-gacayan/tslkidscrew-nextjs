import { ChangeEvent } from 'react';
import InputCheckboxCustom from '../input-checkbox-custom';

export default function RememberMe({ role }: { role: string }) {
  return (
    <div className='block form-control'>
      <InputCheckboxCustom labelText='Remember Me'
        id={`${role}-remember-me`}
        checked={false}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
        }} />
    </div>
  );
}