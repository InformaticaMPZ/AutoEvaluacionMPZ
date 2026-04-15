import { put } from "@/app/api/v1/(functions)/config";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(_req: NextRequest) {
  try {
    const body = await _req.json();

    if (!body) {
      return NextResponse.json(
        { error: "Empty body" },
        { status: 400 }
      );
    }

    const response = await put(
      `/api/v1/autoevaluation-survey/survey/completed`,
      body
    );

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}