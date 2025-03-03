"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authenticateUser, createSession, getRequestToken } from "../services/tmdbService";

import Button from "./button";
import Input from "./input";
import logo from "../../public/Imagem colada.png";
import { useState } from "react";
import {toast} from "react-toastify";
import { ToastContainer } from "react-toastify";


export default function FormLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (event) => {
        event.preventDefault();
    
        try {
            const token = await getRequestToken();
            window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/authorized`;
        } catch (error) {
            toast.error("Erro ao iniciar o processo de login.");
        }
    };

    
    return (
        <div className="bg-[#27272A] p-10 rounded-lg shadow-md w-full max-w-md">
             <ToastContainer /> 
            <div className="flex flex-col">
                <div className="flex justify-center">
                    <Image src={logo} alt="logo" width={109} height={35} className="mb-4"/>
                </div>

                <h1 className="mb-6">Descubra, organize e acompanhe seus filmes favoritos em um só lugar.</h1>
                
                <form>
                    <Input label="Nome" placeholder="Digite seu nome"   value={username} 
                onChange={(e) => setUsername(e.target.value)}  />
                    <Input label="Senha" placeholder="Digite sua senha" type="password"  value={password} 
                onChange={(e) => setPassword(e.target.value)} />
                    
                    <Button type="submit" className="bg-secondary rounded-md w-full"onClick={handleLogin}>Entrar </Button>
                </form>
            </div>
        </div>
    );
}
