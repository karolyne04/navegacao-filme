"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Nav from "@/components/nav";
import Image from "next/image";
import { fetchMovieData } from "@/services/tmdbService";
import PopularMoviesCarousel from "@/components/popular-movies-carousel";
import { FaBookmark } from "react-icons/fa";

interface MovieDetails {
    id: number;
    title: string;
    original_title: string;
    backdrop_path: string;
    poster_path: string;
    overview: string;
    release_date: string;
    runtime: number;
    vote_average: number;
    genres: Array<{ id: number; name: string }>;
    production_companies: Array<{ id: number; name: string }>;
    budget: number;
    revenue: number;
}

export default function FilmePage() {
    const params = useParams();
    const id = params?.id as string;

    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMovieDetails = async () => {
            if (!id) return;

            try {
                const data = await fetchMovieData(id);
                setMovie(data);
            } catch (error) {
                console.error("Erro ao carregar detalhes do filme:", error);
            } finally {
                setLoading(false);
            }
        };

        getMovieDetails();
    }, [id]);

    if (loading || !movie) {
        return <div className="text-white">Carregando...</div>;
    }

    return (
        <div className="min-h-screen bg-primary">
            <Nav />

            {/* Hero Section */}
            <div className="relative w-full h-[500px]">
                <Image
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />

                {/* Conteúdo sobreposto */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex gap-8 items-end max-w-7xl mx-auto">
                        <div className="relative w-[300px] h-[450px] flex-shrink-0">
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                fill
                                className="object-cover rounded-lg shadow-xl"
                            />
                        </div>

                        <div className="flex-1">
                            <h1 className="text-4xl font-bold text-white mb-2">
                                {movie.title}
                            </h1>
                            <p className="text-gray-300 text-xl mb-4">
                                {movie.original_title}
                            </p>

                            <div className="flex items-center gap-4 text-white mb-6">
                                <span>{new Date(movie.release_date).getFullYear()}</span>
                                <span>{movie.runtime} min</span>
                                <span className="flex items-center gap-1">
                                    <span className="text-yellow-400">★</span>
                                    {movie.vote_average.toFixed(1)}
                                </span>
                            </div>

                            {/* Gêneros */}
                            <div className="flex gap-2 mb-8">
                                {movie.genres.map(genre => (
                                    <span
                                        key={genre.id}
                                        className="px-4 py-1 bg-zinc-800 text-white rounded-full text-sm hover:bg-zinc-700 transition-colors cursor-pointer"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>

                            {/* Sinopse com borda */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold text-white mb-4">Sinopse</h2>
                                <div className="border border-zinc-700 rounded-lg p-6">
                                    <p className="text-gray-300">
                                        {movie.overview}
                                    </p>
                                </div>
                            </div>

                            {/* Informações de Produção */}
                            <div className="grid grid-cols-4 gap-8 mb-8">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-400 mb-1">Produção</h3>
                                    <p className="text-white">{movie.production_companies[0]?.name}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-400 mb-1">País de origem</h3>
                                    <p className="text-white">Estados Unidos Da América</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-400 mb-1">Idioma Original</h3>
                                    <p className="text-white">Inglês</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-400 mb-1">Orçamento</h3>
                                    <p className="text-white">
                                        R$ {(movie.budget / 1000000).toFixed(0)}M
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Seção de Recomendações */}
            <div className="max-w-7xl mx-auto px-8 py-12">
                <h2 className="text-2xl font-bold text-white mb-6">Recomendações</h2>
                <PopularMoviesCarousel />
            </div>
        </div>
    );
} 