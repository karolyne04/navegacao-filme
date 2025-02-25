"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Nav from "@/components/nav";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    vote_average: number;
    release_date: string;
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

    return (
        <div className="min-h-screen bg-primary">
            <Nav />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl text-white mb-6">
                    Resultados para: {query}
                </h1>

                {loading ? (
                    <div className="text-white">Carregando...</div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {movies.map((movie) => (
                            <div
                                key={movie.id}
                                className="relative group cursor-pointer"
                            >
                                <Image
                                    src={movie.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                        : '/placeholder-movie.jpg'
                                    }
                                    alt={movie.title}
                                    width={300}
                                    height={450}
                                    className="rounded-lg"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg p-4 flex flex-col justify-end">
                                    <h2 className="text-white font-bold">{movie.title}</h2>
                                    <p className="text-white text-sm mt-2 line-clamp-3">
                                        {movie.overview}
                                    </p>
                                    <div className="flex items-center mt-2">
                                        <span className="text-yellow-400">★</span>
                                        <span className="text-white ml-1">
                                            {movie.vote_average ? movie.vote_average.toFixed(1) : '0.0'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
} 