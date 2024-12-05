"use server";

import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const sessionId = request.cookies.get("tmdbSessionId"); // Apenas verifica os cookies, pois sessionStorage não funciona no servidor
    
    if (!sessionId && request.nextUrl.pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
    matcher: ["/inicio", "/favoritos"], // Rotas que precisam de autenticação
};
