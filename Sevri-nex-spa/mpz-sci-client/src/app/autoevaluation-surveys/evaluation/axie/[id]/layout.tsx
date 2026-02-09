'use client'

import { useSurvey } from "@/hooks/useSurvey";


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode, params: { id: number } }>) {
  useSurvey()
  return (
    <main  className="bg-gray-50">{children}</main>
  );
}
