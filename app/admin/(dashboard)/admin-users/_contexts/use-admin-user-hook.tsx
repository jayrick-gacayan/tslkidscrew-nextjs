import { useContext } from "react"
import { AdminUserContext } from "./admin-users-context"

export function useAdminUserHook() {
  const context = useContext(AdminUserContext);

  if (!context) {
    throw new Error(`useAdminUserHook must be used within a AdminUserProvider`)
  }

  const [state, dispatch] = context;

  function modalOpen(open: boolean) {
    dispatch({ type: 'modalOpen', payload: open })
  }

  function modalType(type: string) {
    dispatch({ type: 'modalType', payload: type });
  }

  function setDumpData(data: any) {
    dispatch({ type: 'setData', payload: data })
  }

  return {
    state,
    dispatch,
    modalOpen,
    modalType,
    setDumpData,
  }
}