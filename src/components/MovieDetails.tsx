import Image from "next/image";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { toast } from "react-hot-toast";
import PopularMoviesCarousel from "@/components/popular-movies-carousel";
import { Movie } from "@/types";

interface MovieDetailsProps {
    movie: Movie;
    onClose: () => void;
    isFavorite: boolean;
    handleFavorite: (movie: Movie) => void;
}

export default function MovieDetails({ movie, onClose, isFavorite, handleFavorite }: MovieDetailsProps) {
    return (
        <div className="relative">
            <div className="relative w-full h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
            </div>

            <div className="absolute top-4 right-4 z-10">
                <button
                    onClick={() => handleFavorite(movie)}
                    className="text-white p-3 rounded transition-colors"
                >
                    {isFavorite ? <FaBookmark size={20} /> : <FaRegBookmark size={20} />}
                </button>
                <button onClick={onClose} className="ml-4 text-white p-3">Fechar</button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex gap-8">
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        width={300}
                        height={450}
                        className="rounded-lg shadow-2xl"
                    />
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold text-white mb-2">{movie.title}</h1>
                        <p className="text-gray-300 text-xl mb-4">{movie.original_title}</p>

                        <div className="flex items-center gap-4 text-white mb-6">
                            <span>{new Date(movie.release_date).getFullYear()}</span>
                            <span>{movie.runtime} min</span>
                            <span className="flex items-center gap-1">
                                <span className="text-yellow-400">★</span>
                                {movie.vote_average?.toFixed(1)}
                            </span>
                        </div>

                        {movie.genres && (
                            <div className="flex gap-2 mb-8">
                                {movie.genres.map(genre => (
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
                                <p className="text-gray-300">{movie.overview}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold text-white mb-6">Recomendações</h2>
                <PopularMoviesCarousel />
            </div>
        </div>
    );
}
