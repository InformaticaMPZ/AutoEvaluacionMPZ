import { getOdoo, postOdoo } from "@/app/api/v1/(functions)/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(_req: NextRequest) {
  try {
    const body = await _req.json();

    if (!body) {
      return NextResponse.json(
        { error: "Empty body" },
        { status: 400 }
      );
    }

    const response = await postOdoo(
      `/api/v1/mature-model/proposed-actions`,
      body
    );

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creando acción" },
      { status: 500 }
    );
  }
}

export async function GET(_req: NextRequest) {
  try {
    const url = new URL(_req.url);
    const department_id = url.searchParams.get("department_id");

    if (!department_id) {
      return NextResponse.json(
        { error: "Missing department_id" },
        { status: 400 }
      );
    }

    const response = await getOdoo(
      `/api/v1/mature-model/proposed-actions/${department_id}`
    );

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error obteniendo acciones" },
      { status: 500 }
    );
  }
}
