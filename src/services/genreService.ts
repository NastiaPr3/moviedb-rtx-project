import {IRes} from "../types";
import {IGenres, IGenresList, IMovie, IMovies} from "../interfaces";
import {apiService} from "./apiService";
import {urls} from "../constants";

const genreService = {
    getAllGenres: (): IRes<IGenresList<IGenres>> => apiService.get(urls.genres.base),
    getGenresById: (id: number, page: string):IRes<IMovies<IMovie>> => apiService.get(urls.genres.byGenresId(id), {params: {page}})
}

export {
    genreService
}