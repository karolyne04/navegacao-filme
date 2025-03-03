"use client";

import Image from "next/image";
import logo from "../../public/Imagem colada.png";
import Button from "./button";
import { IoVideocamOutline } from "react-icons/io5";
import Search from "./search";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Nav() {
    const router = useRouter();
    const [isSearching, setIsSearching] = useState(false);

    const handleLogin = () => {
        router.push('/');
    };

    const handleSearch = async (query: string) => {
        if (!query.trim()) return;

        try {
            setIsSearching(true);
            router.push(`/busca?q=${encodeURIComponent(query)}`);
        } catch (error) {
            toast.error("Erro ao realizar a busca");
            console.error("Erro na busca:", error);
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className="bg-primary flex g-5 justify-between p-2">
            <div className="flex gap-3 p-1 justify-items-center">
                <IoVideocamOutline
                    size={28}
                    color="#E51A54"
                    className="flex self-center justify-items-center cursor-pointer"
                    onClick={() => router.push('/inicial')}
                />
                <Image
                    src={logo}
                    alt="logo"
                    width={109}
                    height={35}
                    className="cursor-pointer"
                    onClick={() => router.push('/inicial')}
                />
            </div>
            <div className="flex flex-1 justify-end items-center gap-4 pr-4">
                <Search
                    onSearch={handleSearch}
                    className="w-80"
                    disabled={isSearching}
                    placeholder="Buscar filmes..."
                    color="black"
                />
                <Button
                    title="Faça login"
                    onClick={handleLogin}
                />
            </div>
        </div>
    );
}