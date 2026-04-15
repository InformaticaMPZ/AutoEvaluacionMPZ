import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const unprotectedRoutes = [
  "/",
  "/api/auth",
  "/api/v1/token/verify",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (unprotectedRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"))) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    if (!process.env.JWT_SECRET_KEY) {
      throw new Error("JWT_SECRET_KEY no definido");
    }

    const { payload } = await jwtVerify(
      token.value,
      new TextEncoder().encode(process.env.JWT_SECRET_KEY)
    );

    if (!payload.department) {
      return new NextResponse(
        JSON.stringify({ error: "Usuario sin departamento" }),
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: [
    "/menu-Evaluations/:path*",
    "/autoevaluation-surveys/:path*",
    "/mature-model/:path*",
    "/sevri-survey/:path*",
    "/api/protected/:path*",
  ],
};
// import { NextRequest, NextResponse } from "next/server";
// import { jwtVerify } from "jose";

// const unprotectedRoutes = ['/login', '/api/v1/token', '/api/v1/token/verify'];

// export async function middleware(req: NextRequest) {
//     const url = req.nextUrl.clone();

//     if (unprotectedRoutes.includes(url.pathname)) return NextResponse.next();
//     const token = req.cookies.get("token");

// const returnUrl = encodeURIComponent(url.href);

// if (!token) return NextResponse.redirect("https://odoo.perezzeledon.go.cr/web/login");
//     // if (!token) return NextResponse.redirect(new URL(`${process.env.BACKEND_URL_SSL}/web/login`, url));
//     const payload = await verifyToken(token.value);

//     if (!payload) return NextResponse.redirect(new URL(`${process.env.BACKEND_URL_SSL}/web/login`, url));

//     if (!payload.department) {
//         return new NextResponse(JSON.stringify({ error: "Falta el departamento." }), {
//             status: 403,
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         });
//     }
//     return NextResponse.next();
// }

// async function verifyToken(token: string) {
//     try {
//         const tokenModifed = token.substring(0, token.length - 1)
//         const { payload } = await jwtVerify(tokenModifed, new TextEncoder().encode(process.env.JWT_SECRET_KEY));
//         return payload;
//     } catch (error) {
//         console.log(error)
//         return null;
//     }
// }

// export const config = {
//     matcher: [
//         "/api/:path*",
//         "/autoevaluation-surveys/:path*",
//         "/mature-model/:path*",
//         "/menu-Evaluations/:path*",
//         "/sevri-survey/:path*"
//     ],
// };
