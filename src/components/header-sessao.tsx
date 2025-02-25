"use client";

import Image from "next/image";
import logo from "../../public/Imagem colada.png";
import { IoVideocamOutline } from "react-icons/io5";
import Search from "./search";
import { FiUser } from "react-icons/fi";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useClickOutside } from "../hooks/useClickOutside";

export default function HeaderSessao() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useClickOutside(dropdownRef, () => {
        if (isDropdownOpen) setIsDropdownOpen(false);
    });

    const pesquisar = () => {
        return (query: string) => {
            console.log("Pesquisando:", query);
        };
    };

    const handleLogout = () => {
        // Adicione aqui sua lógica de logout
        router.push('/');
    };

    return (
        <div className="bg-primary flex g-5 justify-between	p-2">
            <div className="flex gap-3 p-1 justify-items-center">
                
                <IoVideocamOutline size={28} color="#E51A54" className="flex self-center justify-items-center" />
                <Image src={logo} alt="logo" width={109} height={35} />
            </div>
            <div className="flex flex-1 justify-end items-center gap-4 pr-4">
                <Search onSearch={pesquisar()} className="w-80" />

                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="bg-secondary w-10 h-10 flex items-center justify-center rounded-full hover:bg-opacity-80 transition-colors"
                    >
                        <FiUser className="text-white" size={20} />
                    </button>

                    
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-zinc-900 rounded-lg shadow-lg py-1 z-50">
                            <div className="px-4 py-2 text-white border-b border-zinc-700">
                                Olá, syslae👋
                            </div>
                            <a
                                href="/perfil"
                                className="block px-4 py-2 text-white hover:bg-zinc-700 transition-colors border-b border-zinc-700"
                            >
                                Perfil
                            </a>
                            <div className="justify-center content-center py-2 px-2">

                                <button
                                    onClick={handleLogout}
                                    className="bg-secondary block w-full text-left rounded-md px-4 py-2 text-white hover:bg-zinc-700 transition-colors"
                                >
                                    Sair da sessão
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}