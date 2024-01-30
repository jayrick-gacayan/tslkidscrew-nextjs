import { configureStore } from '@reduxjs/toolkit';

import AdminUsersReducer from '@/app/admin/(dashboard)/admin-users/_redux/admin-users-slice';

export const reduxStore = configureStore({
  reducer: {
    adminUsers: AdminUsersReducer,
  },
})

export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch