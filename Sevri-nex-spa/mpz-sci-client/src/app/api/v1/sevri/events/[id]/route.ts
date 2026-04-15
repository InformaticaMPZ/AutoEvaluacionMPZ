import { del, put } from "@/app/api/v1/(functions)/config";
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

    const response = await put(`/api/v1/sevri/events/${params.id}`, body);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error actualizando evento" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await del(`/api/v1/sevri/events/${params.id}`);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error eliminando evento" },
      { status: 500 }
    );
  }
}