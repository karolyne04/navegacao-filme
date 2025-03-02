import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const page = searchParams.get('page') || '1';
    
    if (!query) {
        return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    const baseURL = process.env.TMDB_BASE_URL;
    const apiKey = process.env.TMDB_API_KEY;
    
    try {
        const response = await fetch(
            `${baseURL}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=pt-BR&page=${page}`
        );
        
        if (!response.ok) {
            throw new Error('Erro ao buscar filmes');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
    }
} 