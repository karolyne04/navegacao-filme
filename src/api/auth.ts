// src/app/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Nome", type: "text" },
                password: { label: "Senha", type: "password" }
            },
            async authorize(credentials: { username: any; }) {
                // Coloque aqui a lógica de autenticação (ex.: verificação de usuário e senha).
                // Retorne o usuário se for autenticado com sucesso ou `null` se falhar.
                const user = { id: "1", name: credentials.username };
                return user ? user : null;
            }
        })
    ],
    pages: {
        signIn: "/login"  // Página de login customizada, se necessário
    }
});
