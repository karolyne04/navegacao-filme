"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import type { Swiper as SwiperType } from 'swiper';
import type { Navigation as NavigationType } from 'swiper/types';

interface CarouselProps {
  movies: Movie[];
}

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
}

export default function Carousel({ movies }: CarouselProps) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (swiper && swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      (swiper.navigation as NavigationType).init();
      (swiper.navigation as NavigationType).update();

      const interval = setInterval(() => {
        swiper.slideNext();
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [swiper]);

  if (movies.length === 0) {
    return <div className="text-center text-white mt-4">Nenhum filme encontrado.</div>;
  }

  return (
    <div className="relative w-full overflow-hidden bg-primary">
      <Swiper
        modules={[Navigation, Pagination, EffectCoverflow]}
        effect="coverflow"
        centeredSlides={true}
        slidesPerView={1.8}
        initialSlide={1}
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        pagination={{
          clickable: true,
          type: 'bullets',
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onSwiper={setSwiper}
        className="w-full h-[530px]"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative w-full h-full">
              <Image
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                fill
                priority
                className="object-cover"
              />
              {/* Gradiente sobreposto */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Botões de navegação customizados */}
      <button
        ref={prevRef}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors cursor-pointer"
      >
        <MdChevronLeft size={30} className="text-white" />
      </button>

      <button
        ref={nextRef}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors cursor-pointer"
      >
        <MdChevronRight size={30} className="text-white" />
      </button>

      {/* Estilização adicional */}
      <style jsx global>{`
        .swiper-pagination {
          position: absolute;
          bottom: 20px !important;
          z-index: 20;
        }
        
        .swiper-button-next,
        .swiper-button-prev {
          display: none;
        }
        
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: white;
          opacity: 0.5;
          margin: 0 4px;
        }
        
        .swiper-pagination-bullet-active {
          background: #E51A54;
          opacity: 1;
        }

        .swiper-wrapper {
          align-items: center;
        }
      `}</style>
    </div>
  );
}
