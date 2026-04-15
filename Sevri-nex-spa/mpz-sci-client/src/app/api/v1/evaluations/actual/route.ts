import { get } from "@/app/api/v1/(functions)/config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  try {
    const response = await get(`/api/v1/evaluations/actual`);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("ERROR GET ACTUAL:", error);
    return NextResponse.json(
      { error: "Error obteniendo evaluación actual" },
      { status: 500 }
    );
  }
}