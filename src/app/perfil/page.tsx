"use client";

import HeaderSessao from "@/components/header-sessao";
import { FiUser } from "react-icons/fi";
import { LuGlobe } from "react-icons/lu";
import { FaRegFlag } from "react-icons/fa6";
import PopularMoviesCarousel from "@/components/popular-movies-carousel";
import { useEffect, useState } from "react";
import { getUserDetails } from "@/services/tmdbService";
import Line from "@/components/line";

export default function Perfil() {
    const [user, setUser] = useState<{ username: string } | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const sessionId = localStorage.getItem("sessionId");
            if (sessionId) {
                try {
                    const userData = await getUserDetails(sessionId);
                    setUser(userData);
                } catch (error) {
                    console.error("Erro ao obter dados do usuário:", error);
                }
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="min-h-screen bg-primary">
            <HeaderSessao />
            <div className="border-b border-zinc-700" />
            <Line/>

            <div className="mx-auto px-8 py-12">
                {/* Seção do Perfil */}
                <div className="w-full bg-zinc-900 rounded-lg p-8 border border-zinc-700 mb-12">
                    <div className="flex flex-row">
                        <div className="flex flex-row w-full">

                            <div className="w-32 h-32 bg-secondary rounded-full flex items-center justify-center mb-4">
                                <FiUser className="text-white" size={64} />
                            </div>
                            <div className="m-5 justify-center  ">
                                <h2 className="text-white text-xl font-semibold mb-1">Syslae Solutions</h2>
                                {user ? <h2 className="text-white text-xl font-semibold mb-1"> {user.username} </h2> : <p>carregando...</p>}
                                <p className="text-gray-400 mb-6">@syslaesolutions</p>
                            </div>
                        </div>

                        <div className="flex w-full gap-8 justify-end justify-items-end ">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2 text-gray-300">
                                    <LuGlobe size={20} />
                                    <span>Idioma: Português</span>
                                </div>
                                <div className="bg-zinc-800 px-3 py-1 rounded-full text-white text-sm">
                                    PT
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2 text-gray-300">
                                    <FaRegFlag size={20} />
                                    <span>País: Brasil</span>
                                </div>
                                <div className="bg-zinc-800 px-3 py-1 rounded-full text-white text-sm">
                                    BR
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Seção de Favoritos */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Favoritos</h2>
                    <div className="relative">
                        <PopularMoviesCarousel />
                    </div>
                </div>
            </div>
        </div>
    );
}