import { post } from "@/app/api/v1/(functions)/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body) {
      return NextResponse.json(
        { error: "Empty body" },
        { status: 400 }
      );
    }

    const response = await post(
      `/api/v1/mature-model/evaluations/answer`,
      body
    );

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error enviando respuestas" },
      { status: 500 }
    );
  }
}