'use client';

import BackButton from "../admin/(dashboard)/_components/back-button";

export default function BackButtonClient() {

  return <BackButton onClick={() => { window.history.back(); }} />
} 