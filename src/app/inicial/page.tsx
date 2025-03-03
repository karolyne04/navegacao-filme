import Carousel from "@/components/carousel";
import HeaderSessao from "@/components/header-sessao";
import Nav from "@/components/nav";
import PopularMoviesCarousel from "@/components/popular-movies-carousel";
import { fetchPopularMovies } from "@/services/tmdbService";
import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth/next";
import Line from "@/components/line";


export default async function Inicial() {
    const data = await fetchPopularMovies();
    const session = await getServerSession(authOptions);
    const movies = data.results || [];
    console.log("Session:", session);


    if (!movies || movies.length === 0) {
        return <div>Nenhum filme encontrado.</div>;
    }

    return (
        <div className="bg-primary w-full h-full">
             {session ? <HeaderSessao /> : <Nav />}
             <Line/>
             <div className="mt-5">
                <Carousel movies={movies} />
                <PopularMoviesCarousel />

             </div>
        </div>
    );
}
