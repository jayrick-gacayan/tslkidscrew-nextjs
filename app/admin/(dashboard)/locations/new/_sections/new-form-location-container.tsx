import { NewFormLocation } from './new-form-location';
import { activeAdminUsersAction } from '@/actions/admin-actions';

export default async function NewFormLocationContainer() {
  let data = await activeAdminUsersAction();

  return (<NewFormLocation admins={data} />);
}