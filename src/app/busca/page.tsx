"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Nav from "@/components/nav";
import PopularMoviesCarousel from "@/components/popular-movies-carousel";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Line from "@/components/line";
import FilmePage from "../filme/[id]/page";
import MovieDetails from "@/components/MovieDetails";
import auth from "@/api/auth";
import HeaderSessao from "@/components/header-sessao";

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
    budget?: number;
    revenue?: number;
}

export default function BuscaPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const itemsPerPage = 12; // Definindo o número de itens por página
    const [session, setSession] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            if (!query) return;
            try {
                setLoading(true);
                const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&page=${currentPage}`);
                const data = await response.json();
                setMovies(data.results);
                setTotalPages(Math.min(Math.ceil(data.total_results / itemsPerPage), 107));
                const userSession = await auth(); // Obtendo sessão
                setSession(userSession);


                // Atualizando para calcular total de páginas
                setSelectedMovie(null);
            } catch (error) {
                console.error("Erro ao buscar filmes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [query, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    // Função para adicionar/remover dos favoritos
    const handleFavorite = async (movie: Movie) => {
        try {
            const response = await fetch('/api/favorites', {
                method: isFavorite ? 'DELETE' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(movie)
            });

            if (response.ok) {
                setIsFavorite(!isFavorite);
                toast.success(isFavorite ? 'Removido dos favoritos' : 'Adicionado aos favoritos');
            }
        } catch (err) {
            console.error('Erro:', err);
            toast.error('Erro ao atualizar favoritos');
        }
    };

    return (
        <div className={`h-screen bg-primary flex flex-col ${selectedMovie ? 'overflow-hidden' : ''}`}>
            
            {session ?  <Nav/>:  <HeaderSessao />}
            
            <Line />
            <div className={`flex-1 px-4 py-6 ${selectedMovie ? 'overflow-hidden' : 'overflow-y-auto'}`}>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl text-white">
                        Resultados para: {query}
                    </h1>

                </div>

                {loading ? (
                    <div className="text-white">Carregando...</div>
                ) : !selectedMovie ? (
                    // Grid de resultados
                    <div className="h-[calc(100vh-220px)] overflow-y-auto">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {movies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((movie) => (
                                <div
                                    key={movie.id}
                                    className="relative aspect-[2/3] cursor-pointer group h-80 w-30"
                                    onClick={() => setSelectedMovie(movie)}
                                >
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-end p-4">
                                        <div className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            <h3 className="font-bold">{movie.title}</h3>
                                            <div className="flex items-center mt-1">
                                                <span className="text-yellow-400">★</span>
                                                <span className="ml-1">{movie.vote_average?.toFixed(1)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <>

                       
                        <div className="relative">
                            <div className="relative w-full h-[500px]">

                                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
                            </div>

                            <div className="absolute top-4 right-4 z-10">
                                <button
                                    onClick={() => handleFavorite(selectedMovie)}
                                    className=" text-white p-3 rounded transition-colors"
                                >
                                    {isFavorite ? <FaBookmark size={20} /> : <FaRegBookmark size={20} />}
                                </button>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <div className="flex gap-8">
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                                        alt={selectedMovie.title}
                                        width={300}
                                        height={450}
                                        className="rounded-lg shadow-2xl"
                                    />
                                    <div className="flex-1">
                                        <h1 className="text-4xl font-bold text-white mb-2">
                                            {selectedMovie.title}
                                        </h1>
                                        <p className="text-gray-300 text-xl mb-4">
                                            {selectedMovie.original_title}
                                        </p>

                                        <div className="flex items-center gap-4 text-white mb-6">
                                            <span>{new Date(selectedMovie.release_date).getFullYear()}</span>
                                            <span>{selectedMovie.runtime} min</span>
                                            <span className="flex items-center gap-1">
                                                <span className="text-yellow-400">★</span>
                                                {selectedMovie.vote_average?.toFixed(1)}
                                            </span>
                                        </div>

                                        {selectedMovie.genres && (
                                            <div className="flex gap-2 mb-8">
                                                {selectedMovie.genres.map(genre => (
                                                    <span
                                                        key={genre.id}
                                                        className="px-4 py-1 bg-zinc-800 text-white rounded-full text-sm"
                                                    >
                                                        {genre.name}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <div className="mb-8">
                                            <h2 className="text-xl font-semibold text-white mb-4">Sinopse</h2>
                                            <div className="border border-zinc-700 rounded-lg p-6">
                                                <p className="text-gray-300">
                                                    {selectedMovie.overview}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-4 gap-8">
                                            <div>
                                                <h3 className="text-sm font-semibold text-gray-400 mb-1">Produção</h3>
                                                <p className="text-white">
                                                    {selectedMovie.production_companies?.[0]?.name || 'Não informado'}
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
                                            <div>
                                                <h3 className="text-sm font-semibold text-gray-400 mb-1">Orçamento</h3>
                                                <p className="text-white">
                                                    {selectedMovie.budget ? `R$ ${(selectedMovie.budget / 1000000).toFixed(0)}M` : 'Não informado'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-2xl font-bold text-white mb-6">Recomendações</h2>
                            <PopularMoviesCarousel />
                        </div>
                    </>
                )}

                {/* Paginação */}
                {!selectedMovie && !loading && movies.length > 0 && (
                    <div className="flex justify-center items-center gap-2 mt-4 pb-4">
                        <div className="text-white">
                            Página {currentPage} de {totalPages}
                        </div>

                        {currentPage > 1 && (
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                className="bg-secondary text-white w-8 h-8 flex rounded-xl items-center justify-center hover:bg-pink-700 transition-colors rounded-xl"
                            >
                                {currentPage - 1}
                            </button>
                        )}

                        <button className="bg-secondary text-white w-8 h-8 flex items-center justify-center rounded-xl">
                            {currentPage}
                        </button>

                        {currentPage < totalPages && (
                            <>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className="bg-zinc-800 text-white w-8 h-8 flex items-center justify-center hover:bg-zinc-700 transition-colors rounded-xl"
                                >
                                    {currentPage + 1}
                                </button>

                                {currentPage + 1 < totalPages && (
                                    <>
                                        {currentPage + 2 < totalPages && (
                                            <span className="text-white">...</span>
                                        )}
                                        <button
                                            onClick={() => handlePageChange(totalPages)}
                                            className="bg-zinc-800 text-white w-8 h-8 flex items-center justify-center hover:bg-zinc-700 transition-colors rounded-xl"
                                        >
                                            {totalPages}
                                        </button>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
} 