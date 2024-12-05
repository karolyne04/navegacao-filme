"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";

interface CarouselProps {
  movies: any[];
}

export default function Carousel({ movies }: CarouselProps) {
  const [swiperRef, setSwiperRef] = useState<any>(null);

  useEffect(() => {
    if (swiperRef) {
      const interval = setInterval(() => {
        swiperRef.slideNext();
      }, 10000); // Muda de slide a cada 10 segundos

      return () => clearInterval(interval);
    }
  }, [swiperRef]);

  if (movies.length === 0) {
    return <div className="text-center text-white mt-4">Nenhum filme encontrado.</div>;
  }

  return (
    <div className="text-white p-6 rounded-lg">
      <Swiper
        modules={[Navigation, Pagination]} // Certifique-se de que os módulos estão ativados
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        onSwiper={setSwiperRef}
        className="relative flex justify-center items-center max-w-screen-lg mx-auto"
        style={{ height: "530px" }} // Define uma altura fixa
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className="flex justify-center relative">
            <div className="relative w-full h-full">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.title}
                width={1392}
                height={530}
                className="rounded-lg shadow-lg object-cover w-full h-full"
              />
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-prev">
          <MdChevronLeft size={25} />
        </div>
        <div className="swiper-button-next">
          <MdChevronRight size={25} />
        </div>
        <div className="swiper-pagination" />
      </Swiper>
    </div>
  );
}
