'use client';

import BackButton from './back-button';

export default function BackButtonClient() {

  return <BackButton onClick={() => { window.history.back(); }} />
} 