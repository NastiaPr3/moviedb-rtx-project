import {IRes} from "../types";
import {apiService} from "./apiService";
import {urls} from "../constants";
import {IMovie, IMovies, ITrailer, IVideos, IImage, IImages, IPeople, IPerson, IActor} from "../interfaces";

const trendingMovieService = {
    getTrendingMovies: ():IRes<IMovies<IMovie>> => apiService.get(urls.trending.base),
    getNowPlayingMovies: ():IRes<IMovies<IMovie>> => apiService.get(urls.nowPlaying.base),
    getTrailer: (id: number): IRes<IVideos<ITrailer>> => apiService.get(urls.trailer.base(id)),
    getImages: (id: number): IRes<IImages<IImage>> => apiService.get(urls.images.base(id)),
    getCast: (id: number): IRes<IPeople<IPerson>> =>  apiService.get(urls.people.base(id)),
    getActorsMovies: (id: number): IRes<IActor<IMovie>> => apiService.get(urls.actor.base(id)),
    getRecommendations: (id: number): IRes<IMovies<IMovie>> => apiService.get(urls.recommendations.base(id))
}

export {
    trendingMovieService
}