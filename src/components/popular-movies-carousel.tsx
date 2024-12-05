// src/components/PopularMoviesCarousel.tsx
"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchPopularMovies } from "@/services/tmdbService";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { MdChevronRight } from "react-icons/md";
import { MdChevronLeft } from "react-icons/md";


export default function PopularMoviesCarousel() {
    const [movies, setMovies] = useState<any[]>([]);

    const getMovies = async () => {
        const data = await fetchPopularMovies();
        setMovies(data.results || []);
    };

    useEffect(() => {
        getMovies();
    }, []);

    if (movies.length === 0) {
        return <div>Nenhum filme encontrado.</div>;
    }

    return (
        <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={3}
            spaceBetween={20}
            navigation={{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
            }}
            pagination={{ clickable: true }}
            className="mt-8"
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
                    <div className="absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 ">
                        <h3 className="text-lg font-bold">{movie.title}</h3>
                        <p className="text-sm mt-1 line-clamp-2">{movie.overview}</p>
                        <div className="flex items-center mt-2">
                            <span className="text-yellow-400">★ {movie.vote_average}</span>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
            <div className="swiper-button absolute left-2 top-1/2 transform -translate-y-1/2 bg-pink-500 hover:bg-pink-600 text-white w-10 h-10 flex items-center justify-center rounded-full cursor-pointer z-10 shadow-lg">
                
                <MdChevronLeft size={25} />

            </div>
            <div className="swiper-button absolute right-2 top-1/2 transform -translate-y-1/2 bg-pink-500 hover:bg-pink-600 text-white w-10 h-10 flex items-center justify-center rounded-full cursor-pointer z-10 shadow-lg">
             <MdChevronRight size={25} />
            </div> 
            <div className="swiper-pagination"/> 
        </Swiper>
    );
}
