import { get } from "@/app/api/v1/(functions)/config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing id" },
        { status: 400 }
      );
    }

    const response = await get(
      `/api/v1/mature-model/evaluations/byId/${id}`
    );

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error obteniendo evaluación" },
      { status: 500 }
    );
  }
}