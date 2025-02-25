"use client";

import { useEffect, useState } from "react";
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

export default function FilmePage({ params }: { params: { id: string } }) {
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                const data = await fetchMovieData(params.id);
                setMovie(data);
            } catch (error) {
                console.error("Erro ao carregar detalhes do filme:", error);
            } finally {
                setLoading(false);
            }
        };

        getMovieDetails();
    }, [params.id]);

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
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            width={200}
                            height={300}
                            className="rounded-lg shadow-xl"
                        />
                        <div className="flex-1">
                            <h1 className="text-4xl font-bold text-white mb-2">
                                {movie.title}
                            </h1>
                            <p className="text-gray-300 text-lg mb-4">
                                {movie.original_title}
                            </p>
                            <div className="flex items-center gap-4 text-gray-300 mb-4">
                                <span>{new Date(movie.release_date).getFullYear()}</span>
                                <span>{movie.runtime} min</span>
                                <span className="flex items-center gap-1">
                                    <span className="text-yellow-400">★</span>
                                    {movie.vote_average.toFixed(1)}
                                </span>
                            </div>
                            <div className="flex gap-2 mb-4">
                                {movie.genres.map(genre => (
                                    <span
                                        key={genre.id}
                                        className="px-3 py-1 bg-secondary text-white rounded-full text-sm"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detalhes do Filme */}
            <div className="max-w-7xl mx-auto px-8 py-12">
                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-2">
                        <h2 className="text-2xl font-bold text-white mb-4">Sinopse</h2>
                        <p className="text-gray-300 mb-8">{movie.overview}</p>

                        <h2 className="text-2xl font-bold text-white mb-4">Produção</h2>
                        <div className="flex gap-4 mb-8">
                            {movie.production_companies.map(company => (
                                <span key={company.id} className="text-gray-300">
                                    {company.name}
                                </span>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Orçamento</h3>
                                <p className="text-gray-300">
                                    ${(movie.budget / 1000000).toFixed(2)}M
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Receita</h3>
                                <p className="text-gray-300">
                                    ${(movie.revenue / 1000000).toFixed(2)}M
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button className="w-full bg-secondary text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-pink-700 transition-colors">
                            <FaBookmark />
                            Adicionar aos favoritos
                        </button>
                    </div>
                </div>

                {/* Recomendações */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-white mb-6">Recomendações</h2>
                    <PopularMoviesCarousel />
                </div>
            </div>
        </div>
    );
} 