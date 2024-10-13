import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rotas protegidas
const protectedRoutes = ["/", "/create"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("session")?.value;

  if (token) {
    const payloadBase64 = token.split(".")[1]; // Obtem o payload do token
    const payloadJson = atob(payloadBase64); // Decodifica a parte base64
    const payload = JSON.parse(payloadJson); // Converte o payload para JSON

    // Obtém o timestamp atual e converter para segundos
    const currentTime = Math.floor(Date.now() / 1000);

    // Verificar se o token expirou, se sim, remove a sessão
    if (payload.exp < currentTime - 60) {
      const middResponse = NextResponse.next();

      middResponse.cookies.delete("session");

      return middResponse;
    }
  }

  // Se for uma rota protegida, e estiver sem um token, redireciona para a rota de login
  if (protectedRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Se não for um rota protegida, e tiver um token, redireciona para a rota principal
  if (!protectedRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
