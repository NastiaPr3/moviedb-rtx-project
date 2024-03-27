import {MoviesList, TrendingMovies, NowPlayingMovies} from "../components";

const MoviesPage = () => {
    return (
        <div>
            <NowPlayingMovies/>
            <TrendingMovies/>
            <MoviesList/>
        </div>
    );
};

export {MoviesPage};