import { putOdoo } from "@/app/api/v1/(functions)/config";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await _req.json();

    if (!body) {
      return NextResponse.json(
        { error: "Empty body" },
        { status: 400 }
      );
    }

    const response = await putOdoo(
      `/api/v1/mature-model/proposed-actions/${params.id}`,
      body
    );

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error actualizando acción" },
      { status: 500 }
    );
  }
}