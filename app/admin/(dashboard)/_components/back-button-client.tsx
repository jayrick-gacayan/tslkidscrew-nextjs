'use client';

import { useRouter } from "next/navigation";
import BackButton from "./back-button";

export default function BackButtonClient() {
  const router = useRouter();



  return <BackButton onClick={() => { router.back(); }} />
}