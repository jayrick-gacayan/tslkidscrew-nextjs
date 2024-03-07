import { configureStore } from '@reduxjs/toolkit';

import AdminUsersReducer from '@/app/admin/(dashboard)/admin-users/_redux/admin-users-slice';
import AdminSettingsReducer from '@/app/admin/(dashboard)/settings/_redux/admin-settings-slice';

import FillInFormReducer from '@/app/parent/forms/[program_type]/fill-in-form/_redux/fill-in-form-slice';

export const reduxStore = configureStore({
  reducer: {
    adminUsers: AdminUsersReducer,
    adminSettings: AdminSettingsReducer,
    fillInForm: FillInFormReducer
  },
})

export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch