'use client';

const initialState = {
  modal: { open: false, type: '' },
  data: undefined,
}

import { ReactNode, useMemo, useReducer } from "react";
import { adminUserReducer } from "./admin-use-reducer";
import { AdminUserContext } from "./admin-users-context";

export default function AdminUserProvider({
  children
}: {
  children: ReactNode
}) {
  const [state, dispatch] = useReducer(adminUserReducer, initialState);

  const value = useMemo(() => { return [state, dispatch] }, [state]);

  return (
    <AdminUserContext.Provider value={value}>
      {children}
    </AdminUserContext.Provider>
  )
}