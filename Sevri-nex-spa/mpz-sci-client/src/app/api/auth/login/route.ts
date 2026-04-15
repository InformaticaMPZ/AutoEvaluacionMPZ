import { NextResponse } from "next/server";
import { SignJWT } from "jose";

export async function POST(req: Request) {
  try {
    const { login, password } = await req.json();

    const response = await fetch(`${process.env.ODOO_URL}/web/session/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "call",
        params: {
          db: process.env.ODOO_DB,
          login,
          password
        },
        id: 1
      })
    });

    const data = await response.json();

    if (data.error || !data.result?.uid) {
      return NextResponse.json(
        { error: "Credenciales incorrectas" },
        { status: 401 }
      );
    }

    const token = await new SignJWT({
      email: data.result.username || login,
      user_id: data.result.uid,
      department: null,
      department_name: null
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET_KEY!));

    const res = NextResponse.json({
      success: true,
      user: {
        id: data.result.uid,
        login: data.result.username || login,
        name: data.result.name || login
      }
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    });

    return res;
  } catch (error) {
    console.error("AUTH ERROR:", error);

    return NextResponse.json(
      { error: "Error autenticando con Odoo" },
      { status: 500 }
    );
  }
}