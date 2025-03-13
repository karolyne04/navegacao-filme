import { NextResponse } from "next/server";
import { authenticateUser } from "@/services/tmdbService";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // Validação básica
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Usuário e senha são obrigatórios." },
        { status: 400 }
      );
    }

    const sessionId = await authenticateUser(username, password);

    if (!sessionId) {
      return NextResponse.json(
        { success: false, message: "Credenciais inválidas." },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, session_id: sessionId });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
