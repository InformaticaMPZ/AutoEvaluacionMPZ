import { get, post } from "@/app/api/v1/(functions)/config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  try {
    const response = await get(`/api/v1/sevri/activities`);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("GET ACTIVITIES ERROR:", error);
    return NextResponse.json(
      { error: "Error obteniendo actividades" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body) {
      return NextResponse.json({ error: "Empty body" }, { status: 400 });
    }

    const response = await post(`/api/v1/sevri/activities`, body);
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creando actividad" },
      { status: 500 }
    );
  }
}