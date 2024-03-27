import {apiService} from "./apiService";
import {urls} from "../constants";
import {IRes} from "../types";
import {IMovie, IMovies} from "../interfaces";

const movieService = {
    getAllMovies: (page: string):IRes<IMovies<IMovie>> => apiService.get(urls.movies.base, {params: {page}}),
    getMovieById: (id: number):IRes<IMovie> => apiService.get(urls.movies.byId(id))
}

export {
    movieService
}