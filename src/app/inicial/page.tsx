"use client";

import Carousel from "@/components/carousel";
import HeaderSessao from "@/components/header-sessao";
import Nav from "@/components/nav";
import PopularMoviesCarousel from "@/components/popular-movies-carousel";
import Line from "@/components/line";
import { fetchPopularMovies } from "@/services/tmdbService";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/auth";

export default function Inicial() {
    const [movies, setMovies] = useState([]);
    const [session, setSession] = useState(null);
    const router = useRouter();

    useEffect(() => {
        async function loadData() {
            const data = await fetchPopularMovies();
            setMovies(data.results || []);

            const userSession = await auth(); // Obtendo sessão
            setSession(userSession);

            const sessionId = localStorage.getItem("session_id");
            if (!sessionId) {
                router.push("/login"); // Redireciona para login se não estiver autenticado
            }
        }
        loadData();
    }, []);

    if (!movies || movies.length === 0) {
        return <div>Nenhum filme encontrado.</div>;
    }

    return (
        <div className="bg-primary w-full h-full">
            {session ?  <Nav/>:  <HeaderSessao />}
            <Line />
            <div className="mt-5">
                <Carousel movies={movies} />
                <PopularMoviesCarousel />
            </div>
        </div>
    );
}
