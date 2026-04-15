import { post } from "@/app/api/v1/(functions)/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body) {
      return NextResponse.json({ error: "Empty body" }, { status: 400 });
    }

    const response = await post(`/api/v1/sevri/events`, body);
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creando evento" },
      { status: 500 }
    );
  }
}