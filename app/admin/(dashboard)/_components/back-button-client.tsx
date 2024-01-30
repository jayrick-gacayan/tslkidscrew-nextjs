'use client';

import BackButton from "@/app/admin/_components/back-button";
import { useRouter } from "next/navigation";

export default function BackButtonClient() {
  const router = useRouter();

  return <BackButton onClick={() => { router.back(); }} />
}