import { getOdoo } from "@/app/api/v1/(functions)/config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  try {
    const response = await getOdoo(`/api/v1/sevri/eventTypes`);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error obteniendo tipos de evento" },
      { status: 500 }
    );
  }
}