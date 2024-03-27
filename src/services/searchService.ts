import {apiService} from "./apiService";
import {urls} from "../constants";
import {IRes} from "../types";
import {IMovie, IMovies} from "../interfaces";

const searchService = {
    getMoviesBySearch: (name: string, page: string):IRes<IMovies<IMovie>> => apiService.get(urls.search.base(name), {params: {page}})
}


export {
    searchService
}