import { putOdoo, getOdoo, delOdoo } from "@/app/api/v1/(functions)/config";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await _req.json();

    if (!body) {
      return NextResponse.json({ error: "Empty body" }, { status: 400 });
    }

    const response = await putOdoo(`/api/v1/sevri/activities/${params.id}`, body);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error actualizando actividad" },
      { status: 500 }
    );
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await getOdoo(`/api/v1/sevri/activities/${params.id}`);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error obteniendo actividad" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await delOdoo(`/api/v1/sevri/activities/${params.id}`);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error eliminando actividad" },
      { status: 500 }
    );
  }
}