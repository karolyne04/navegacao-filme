// src/services/tmdbService.ts
"use server";
const baseURL = process.env.TMDB_BASE_URL;
const apiToken = process.env.TMDB_API_TOKEN;
const apiKey = process.env.TMDB_API_KEY;

console.log("Base URL:", baseURL);
console.log("API Token:", apiToken);
console.log("API Key:", apiKey);

const headers = {
  Authorization: `Bearer ${apiToken}`,
  "Content-Type": "application/json",
};

export async function fetchMovieData(movieId: string) {

    const response = await fetch(
        `${baseURL}/movie/${movieId}?&language=pt-BR&append_to_response=credits,similar`,
        {headers}
    );
    
    if (!response.ok) {
        throw new Error('Erro ao buscar dados do filme');
    }
    
    return await response.json();
}

export async function getRequestToken() {
  const response = await fetch(`${baseURL}/authentication/token/new`, { headers });

  if (!response.ok) {
    throw new Error("Erro ao gerar request_token");
  }

  const data = await response.json();
  return data.request_token;
}


export async function fetchPopularMovies() {
   
    const response = await fetch(`${baseURL}/movie/popular?language=pt-BR`, {headers});
    if (!response.ok) {
        console.log("Erro ao buscar filmes:", response.statusText); // Log do erro
        throw new Error('Erro ao buscar filmes populares');
    }
    return await response.json();
    
}

export async function validateToken(requestToken: string, username: string, password: string) {
  const response = await fetch(`${baseURL}/authentication/token/validate_with_login`, {
    method: "POST",
    headers,
    body: JSON.stringify({ username, password, request_token: requestToken }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Erro na autenticação:", data);
    throw new Error(data.status_message || "Falha na autenticação.");
  }

  return data.request_token;
}

export async function authenticateUser(username: string, password: string) {
  try {
    const requestToken = await getRequestToken();
    const validatedToken = await validateToken(requestToken, username, password);

    const response = await fetch(`${baseURL}/authentication/session/new`, {
      method: "POST",
      headers,
      body: JSON.stringify({ request_token: validatedToken }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Erro ao criar sessão.");
    }

    return data.session_id;
  } catch (error) {
    console.error("Erro na autenticação:", error.message);
    throw error;
  }
}



export const  createSession = async (requestToken: string) => {
  const response = await fetch(`${baseURL}/authentication/session/new`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ request_token: requestToken })
  });
  
  const data = await response.json();

  if (!response.ok) {
      throw new Error('Erro ao criar sessão');
  }
  return data.session_id;
}

export async function searchMovies(query: string) {
    const response = await fetch(
        `${baseURL}/search/movie?&query=${encodeURIComponent(query)}&language=pt-BR`, {headers}
    );
    if (!response.ok) {
        throw new Error('Erro ao buscar filmes');
    }
    return await response.json();
}

export async function getUserDetails(sessionId: string) {
    const response = await fetch(`${baseURL}/account?session_id=${sessionId}`, {headers});
    
    if (!response.ok) {
        throw new Error("Erro ao buscar dados do usuário");
    }

    return await response.json();
}

export async function fetchFavoriteMovies(sessionId: string) {
    const response = await fetch(`${baseURL}/account/{account_id}/favorite/movies?session_id=${sessionId}`, { headers });
    
    if (!response.ok) {
        throw new Error("Erro ao buscar filmes favoritos");
    }

    return await response.json();
}


