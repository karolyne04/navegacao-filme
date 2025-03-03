"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createSession } from "../../services/tmdbService";
import { toast } from "react-toastify";

export default function Authorized() {
    const router = useRouter();

    useEffect(() => {
        const processToken = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get("request_token");

            if (token) {
                try {
                    const sessionId = await createSession(token);
                    localStorage.setItem("sessionId", sessionId);
                    document.cookie = `tmdbSessionId=${sessionId}; path=/;`;
                    router.push("/inicial");
                    toast.success("Login realizado com sucesso!");
                } catch (error) {
                    toast.error("Erro ao criar sessão.");
                }
            } else {
                toast.error("Token de autenticação inválido.");
                router.push("/");
            }
        };

        processToken();
    }, [router]);

    return <p>Processando login...</p>;
}
