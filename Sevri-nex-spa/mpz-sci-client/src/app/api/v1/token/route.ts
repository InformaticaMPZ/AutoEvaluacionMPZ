import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body?.token) {
      return NextResponse.json(
        { error: "Token requerido" },
        { status: 400 }
      );
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set("token", body.token, {
      httpOnly: true,
      secure: false, // true en producción
      sameSite: "lax",
      path: "/", //IMPORTANTE
      maxAge: 60 * 60,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Error guardando token" },
      { status: 500 }
    );
  }
}