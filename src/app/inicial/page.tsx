import Carousel from "@/components/carousel";
import HeaderSessao from "@/components/header-sessao";
import Nav from "@/components/nav";
import PopularMoviesCarousel from "@/components/popular-movies-carousel";
import { fetchPopularMovies } from "@/services/tmdbService";

export default async function Inicial() {
    const data = await fetchPopularMovies();
    const movies = data.results || [];

    if (!movies || movies.length === 0) {
        return <div>Nenhum filme encontrado.</div>;
    }

    return (
        <div className="bg-primary w-full h-full">
            <Nav />
            <HeaderSessao/>
            <Carousel movies={movies} />
            <PopularMoviesCarousel />
        </div>
    );
}
