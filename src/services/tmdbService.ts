// src/services/tmdbService.ts
"use server";
export async function fetchMovieData(movieId: string) {
    const baseURL = process.env.TMDB_BASE_URL;
    const apiKey = process.env.TMDB_API_KEY;
  
    const response = await fetch(
        `${baseURL}/movie/${movieId}?api_key=${apiKey}&language=pt-BR&append_to_response=credits,similar`
    );
    
    if (!response.ok) {
        throw new Error('Erro ao buscar dados do filme');
    }
    
    return await response.json();
}

export async function getRequestToken() {
    const baseURL = process.env.TMDB_BASE_URL;
    const apiKey = process.env.TMDB_API_KEY;

    const response = await fetch(`${baseURL}/authentication/token/new?api_key=${apiKey}`);
    if (!response.ok) {
        throw new Error('Erro ao obter o request token');
    }

    const data = await response.json();
    return data.request_token;
}

export async function fetchPopularMovies() {
    const baseURL = process.env.TMDB_BASE_URL;
    const apiKey = process.env.TMDB_API_KEY;
    
    console.log("Base URL:", baseURL); // Deve mostrar 'https://api.themoviedb.org/3'
    console.log("API Key:", apiKey); // Deve mostrar sua chave de API
    const response = await fetch(`${baseURL}/movie/popular?api_key=${apiKey}`);
    if (!response.ok) {
        console.log("Erro ao buscar filmes:", response.statusText); // Log do erro
        throw new Error('Erro ao buscar filmes populares');
    }

    const data = await response.json();
    console.log("Dados recebidos da API:", data); // Verifique o que está sendo retornado
    return data;
}

export async function authenticateUser() {
  const baseURL = process.env.TMDB_BASE_URL;
  const apiKey = process.env.TMDB_API_KEY;

  const response = await fetch(`${baseURL}/authentication/token/new?api_key=${apiKey}`);
  if (!response.ok) throw new Error("Erro ao obter token de autenticação");
  
  const data = await response.json();
  return data.request_token;
}

export async function createSession(requestToken: string) {
  const baseURL = process.env.TMDB_BASE_URL;
  const apiKey = process.env.TMDB_API_KEY;

  const response = await fetch(`${baseURL}/authentication/session/new?api_key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ request_token: requestToken })
  });

  if (!response.ok) {
      throw new Error('Erro ao criar sessão');
  }

  const data = await response.json();
  return data.session_id;
}

export async function searchMovies(query: string) {
    const baseURL = process.env.TMDB_BASE_URL;
    const apiKey = process.env.TMDB_API_KEY;
    
    const response = await fetch(
        `${baseURL}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=pt-BR`
    );
    
    if (!response.ok) {
        throw new Error('Erro ao buscar filmes');
    }

    const data = await response.json();
    return data;
}

export async function getUserDetails(sessionId: string) {
    const baseURL = process.env.TMDB_BASE_URL;
    const apiKey = process.env.TMDB_API_KEY;

    const response = await fetch(`${baseURL}/account?api_key=${apiKey}&session_id=${sessionId}`);
    
    if (!response.ok) {
        throw new Error("Erro ao buscar dados do usuário");
    }

    return await response.json();
}
