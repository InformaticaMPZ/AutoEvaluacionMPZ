'use client';

import type { ReactNode } from "react";
import { useSurvey } from "@/hooks/useSurvey";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  useSurvey();

  return <main className="bg-gray-50">{children}</main>;
}