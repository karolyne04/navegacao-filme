"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Nav from "@/components/nav";
import PopularMoviesCarousel from "@/components/popular-movies-carousel";
import { FaBookmark } from "react-icons/fa";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    vote_average: number;
    release_date: string;
    original_title: string;
    runtime?: number;
    genres?: Array<{ id: number; name: string }>;
    production_companies?: Array<{ id: number; name: string }>;
}

export default function BuscaPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            if (!query) return;

            try {
                setLoading(true);
                const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Erro ao buscar filmes');
                }

                setMovies(data.results);
            } catch (error) {
                console.error("Erro ao buscar filmes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [query]);

    if (loading) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <div className="text-white">Carregando...</div>
            </div>
        );
    }

    const firstMovie = movies[0];

    if (!firstMovie) {
        return (
            <div className="min-h-screen bg-primary">
                <Nav />
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl text-white">Nenhum resultado encontrado para: {query}</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-primary">
            <Nav />

            <div className="relative">
                {/* Banner principal */}
                <div className="relative w-full h-[600px]">
                    {firstMovie.backdrop_path ? (
                        <Image
                            src={`https://image.tmdb.org/t/p/original${firstMovie.backdrop_path}`}
                            alt={firstMovie.title}
                            fill
                            className="object-cover"
                            priority
                            quality={100}
                        />
                    ) : (
                        <div className="w-full h-full bg-zinc-900" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
                </div>

                {/* Conteúdo do filme */}
                <div className="absolute bottom-0 left-0 right-0 px-8 py-12">
                    <div className="container mx-auto flex gap-8">
                        {/* Poster */}
                        <div className="relative w-[300px] h-[450px] flex-shrink-0">
                            {firstMovie.poster_path ? (
                                <Image
                                    src={`https://image.tmdb.org/t/p/w500${firstMovie.poster_path}`}
                                    alt={firstMovie.title}
                                    fill
                                    className="object-cover rounded-lg shadow-2xl"
                                    priority
                                />
                            ) : (
                                <div className="w-full h-full bg-zinc-800 rounded-lg" />
                            )}
                        </div>

                        {/* Informações */}
                        <div className="flex-1">
                            <h1 className="text-4xl font-bold text-white mb-2">
                                {firstMovie.title}
                            </h1>
                            <p className="text-gray-300 text-xl mb-4">
                                {firstMovie.original_title}
                            </p>

                            <div className="flex items-center gap-4 text-white mb-6">
                                <span>{firstMovie.release_date && new Date(firstMovie.release_date).getFullYear()}</span>
                                <span className="flex items-center gap-1">
                                    <span className="text-yellow-400">★</span>
                                    {firstMovie.vote_average ? firstMovie.vote_average.toFixed(1) : '0.0'}
                                </span>
                            </div>

                            {/* Gêneros */}
                            {firstMovie.genres && (
                                <div className="flex gap-2 mb-8">
                                    {firstMovie.genres.map(genre => (
                                        <span
                                            key={genre.id}
                                            className="px-4 py-1 bg-zinc-800 text-white rounded-full text-sm hover:bg-zinc-700 transition-colors cursor-pointer"
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Sinopse */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold text-white mb-4">Sinopse</h2>
                                <div className="border border-zinc-700 rounded-lg p-6">
                                    <p className="text-gray-300">
                                        {firstMovie.overview}
                                    </p>
                                </div>
                            </div>

                            {/* Informações de Produção */}
                            <div className="grid grid-cols-4 gap-8">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-400 mb-1">Produção</h3>
                                    <p className="text-white">
                                        {firstMovie.production_companies?.[0]?.name || 'Não informado'}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-400 mb-1">País de origem</h3>
                                    <p className="text-white">Estados Unidos Da América</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-400 mb-1">Idioma Original</h3>
                                    <p className="text-white">Inglês</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recomendações */}
            <div className="container mx-auto px-8 py-12">
                <h2 className="text-2xl font-bold text-white mb-6">
                    Recomendações
                </h2>
                <PopularMoviesCarousel />
            </div>
        </div>
    );
} 