"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface MovieCardProps {
    id: number;
    title: string;
    posterPath: string;
    overview: string;
    rating: number;
}

export default function MovieCard({ id, title, posterPath, overview, rating }: MovieCardProps) {
    const router = useRouter();

    return (
        <div
            className="relative group cursor-pointer"
            onClick={() => router.push(`/filme/${id}`)}
        >
            <Image
                src={`https://image.tmdb.org/t/p/w500${posterPath}`}
                alt={title}
                width={300}
                height={450}
                className="rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg p-4 flex flex-col justify-end">
                <h2 className="text-white font-bold">{title}</h2>
                <p className="text-white text-sm mt-2 line-clamp-3">
                    {overview}
                </p>
                <div className="flex items-center mt-2">
                    <span className="text-yellow-400">★</span>
                    <span className="text-white ml-1">
                        {rating ? rating.toFixed(1) : '0.0'}
                    </span>
                </div>
            </div>
        </div>
    );
} 