'use client';

import { reduxStore } from '@/react-redux/redux-store';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

export default function Providers({ children }: { children: ReactNode; }) {
  return (<Provider store={reduxStore}>{children}</Provider>);
}