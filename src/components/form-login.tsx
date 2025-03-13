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
    const [loading, setLoading] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
    
        try {
          const response = await fetch("/api/tmdb/authenticate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          });
    
          const data = await response.json();
    
          if (!response.ok || !data.success) {
            throw new Error(data.message || "Erro ao autenticar");
          }
    
          // Salvar session_id no localStorage
          localStorage.setItem("session_id", data.session_id);
          toast.success("Login bem-sucedido!");
          router.push("/inicial");
        } catch (error) {
          toast.error(error.message || "Erro ao fazer login.");
        } finally {
          setLoading(false);
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
                    
                    <Button type="submit" className="bg-secondary rounded-md w-full" onClick={handleLogin}> {loading ? "Entrado..." : "Entrar"} </Button>
                </form>
            </div>
        </div>
    );
}
