// src/components/PopularMoviesCarousel.tsx
"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { fetchPopularMovies } from "@/services/tmdbService";
import type { Swiper as SwiperType } from 'swiper';
import type { Navigation as NavigationType } from 'swiper/types';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { MdChevronRight, MdChevronLeft } from "react-icons/md";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    vote_average: number;
}

export default function PopularMoviesCarousel() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [swiper, setSwiper] = useState<SwiperType | null>(null);
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

    const getMovies = async () => {
        const data = await fetchPopularMovies();
        setMovies(data.results || []);
    };

    useEffect(() => {
        getMovies();
    }, []);

    useEffect(() => {
        if (swiper && swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            (swiper.navigation as NavigationType).init();
            (swiper.navigation as NavigationType).update();
        }
    }, [swiper]);

    if (movies.length === 0) {
        return <div>Nenhum filme encontrado.</div>;
    }

    return (
        <div className="relative group">
            <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={3}
                spaceBetween={20}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                className="mt-8"
                onSwiper={setSwiper}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1440: { slidesPerView: 5 },
                }}
            >
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id} className="relative group">
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            width={300}
                            height={400}
                            className="rounded-md"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 rounded-md">
                            <h3 className="text-lg font-bold">{movie.title}</h3>
                            <p className="text-sm mt-1 line-clamp-2">{movie.overview}</p>
                            <div className="flex items-center mt-2">
                                <span className="text-yellow-400">★ {movie.vote_average.toFixed(1)}</span>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Botões de navegação customizados */}
            <button
                ref={prevRef}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-secondary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-pink-700"
            >
                <MdChevronLeft size={24} className="text-white" />
            </button>

            <button
                ref={nextRef}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-secondary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-pink-700"
            >
                <MdChevronRight size={24} className="text-white" />
            </button>

            <style jsx global>{`
                .swiper-button-disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
            `}</style>
        </div>
    );
}
